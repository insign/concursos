from __future__ import annotations

import bz2
import copy
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(
    "src/content/assuntos/tce-ma-2026-analista-administracao/"
    "conhecimentos-gerais/lingua-portuguesa/crase"
)
BUNDLE_PATH = Path('.github/crase-bundle.b64')
EXPECTED_COMPRESSED_LEN = 13234
EXPECTED_COMPRESSED_SHA = '34d8d2b9199a6e2f43bd6203820ca1081bcaa700c7606b746d872bd2edad073c'
EXPECTED_RAW_SHA = 'c86ec605fec4ebc0a98655fc9bc6898c437a8b83604435e77fca9d8a47a6b9e2'
LETTERS = list('ABCDE')


def load_bundle() -> dict:
    compressed = BUNDLE_PATH.read_bytes()
    compressed_sha = hashlib.sha256(compressed).hexdigest()
    print('compressed bytes:', len(compressed), 'sha256=', compressed_sha)
    if len(compressed) != EXPECTED_COMPRESSED_LEN or compressed_sha != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError('compressed bundle checksum mismatch')

    raw = bz2.decompress(compressed)
    raw_sha = hashlib.sha256(raw).hexdigest()
    print('bundle bytes:', len(raw), 'sha256=', raw_sha)
    if raw_sha != EXPECTED_RAW_SHA:
        raise RuntimeError('raw bundle checksum mismatch')

    bundle = json.loads(raw.decode('utf-8'))
    if set(bundle) != {'insertions', 'cheat', 'questions'}:
        raise RuntimeError(f'unexpected bundle keys: {sorted(bundle)}')
    if len(bundle['questions']) != 80:
        raise RuntimeError('bundle must contain exactly 80 new questions')
    return bundle


def insert_before(text: str, marker: str, block: str) -> str:
    if marker not in text:
        raise RuntimeError(f'marker not found: {marker}')
    return text.replace(marker, block.rstrip() + '\n\n' + marker, 1)


def patch_content(bundle: dict) -> None:
    path = ROOT / 'conteudo.md'
    text = path.read_text(encoding='utf-8')
    text = re.sub(
        r'^description: .+$',
        'description: Crase com regência, artigo, demonstrativos, relativos, elipses, pronomes, horários, locuções e reescritas cobradas em concursos.',
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if '<!-- REVISAO-CRASE-2026 -->' not in text:
        ins = bundle['insertions']
        required = {
            'before_names',
            'before_demonstratives',
            'before_locutions',
            'before_hours',
            'before_elipse',
            'before_pronouns',
            'before_facultatives',
            'before_rewrites',
            'before_method',
            'references',
        }
        if set(ins) != required:
            raise RuntimeError(f'unexpected insertion keys: {sorted(ins)}')

        text = insert_before(text, '## 4. Antes de nomes femininos', ins['before_names'])
        text = insert_before(text, '## 5. Demonstrativos e relativos', ins['before_demonstratives'])
        text = insert_before(text, '## 6. Locuções femininas', ins['before_locutions'])
        text = insert_before(text, '## 7. Horas, intervalos e duração', ins['before_hours'])
        text = insert_before(text, '## 8. Elipse de *moda* ou *maneira*', ins['before_elipse'])
        text = insert_before(text, '## 10. Antes de pronomes e formas de tratamento', ins['before_pronouns'])
        text = insert_before(text, '## 11. Casos facultativos', ins['before_facultatives'])
        text = insert_before(text, '## 17. Reescritas e mudança de correção', ins['before_rewrites'])
        text = insert_before(text, '## 18. Método de prova', ins['before_method'])
        text = insert_before(text, '## Referências', ins['references'])

    path.write_text(text, encoding='utf-8')


def patch_cheat(bundle: dict) -> None:
    cheat = bundle['cheat']
    if not isinstance(cheat, str) or len(cheat) < 3500:
        raise RuntimeError('invalid cheat sheet in bundle')
    (ROOT / 'cheat-sheet.md').write_text(cheat.rstrip() + '\n', encoding='utf-8')


def fifth_distractor(prompt: str, existing: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if 'relativ' in lowered or 'qual' in lowered or 'quem' in lowered:
        candidates.append('O acento depende apenas do gênero do antecedente, não da função interna do relativo.')
    if 'hora' in lowered or 'interval' in lowered or 'tempo' in lowered:
        candidates.append('Toda expressão numérica de tempo exige acento grave, independentemente do valor temporal.')
    if 'pronome' in lowered or 'ela' in lowered or 'mim' in lowered:
        candidates.append('A regência com preposição a torna obrigatório o acento diante de qualquer pronome.')
    if 'topônim' in lowered or 'bahia' in lowered or 'brasília' in lowered:
        candidates.append('Todo nome de lugar feminino recebe artigo definido e, por isso, exige crase.')
    if 'infinit' in lowered or 'analisar' in lowered or 'colaborar' in lowered:
        candidates.append('O infinitivo admite artigo feminino sempre que completar um verbo que rege a preposição a.')
    if 'locução' in lowered or 'distância' in lowered or 'instrumento' in lowered:
        candidates.append('Qualquer expressão feminina de modo, meio ou distância recebe acento por regra mecânica.')
    candidates.extend([
        'A palavra feminina, por si só, torna o acento grave obrigatório.',
        'A decisão depende apenas da pausa prevista na leitura em voz alta.',
        'A presença da preposição a dispensa verificar artigo, demonstrativo ou determinação.',
    ])
    for candidate in candidates:
        if candidate not in existing:
            return candidate
    raise RuntimeError('could not create unique fifth distractor')


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get('options')
    ids = [item.get('id') for item in options] if isinstance(options, list) else []
    if ids not in [list('ABCD'), list('ABCDE')]:
        raise RuntimeError(f'invalid original options in {question.get("id")}: {ids}')

    options = copy.deepcopy(options)
    if len(options) == 4:
        existing = {item.get('text', '') for item in options}
        options.append({'id': 'E', 'text': fifth_distractor(question.get('prompt', ''), existing)})

    current_id = question.get('correctOptionId')
    correct = next((copy.deepcopy(item) for item in options if item.get('id') == current_id), None)
    others = [copy.deepcopy(item) for item in options if item.get('id') != current_id]
    if correct is None or len(others) != 4:
        raise RuntimeError(f'cannot identify correct option in {question.get("id")}')

    reordered = []
    other_index = 0
    for option_id in LETTERS:
        if option_id == target_id:
            item = correct
        else:
            item = others[other_index]
            other_index += 1
        item['id'] = option_id
        reordered.append(item)

    question['options'] = reordered
    question['correctOptionId'] = target_id
    question['revision'] = 2
    if 'Fonte:' not in question.get('explanation', ''):
        question['explanation'] = (
            question.get('explanation', '').rstrip()
            + ' Fonte: questão autoral do conjunto original, revisada editorialmente.'
        )


def validate(data: dict, bundle: dict) -> None:
    if data.get('questionSetRevision') != 2:
        raise RuntimeError('questionSetRevision must be 2')
    questions = data.get('questions')
    if not isinstance(questions, list):
        raise RuntimeError('questions must be a list')

    expected_ids = [f'q{number}' for number in range(3519, 3659)]
    actual_ids = [item.get('id') for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError('question IDs must be unique and sequential from q3519 to q3658')

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {'id', 'revision', 'prompt', 'options', 'correctOptionId', 'explanation'}
        if set(question) != expected_keys:
            raise RuntimeError(f'unexpected keys in {question.get("id")}: {sorted(question)}')
        options = question['options']
        if [option.get('id') for option in options] != LETTERS:
            raise RuntimeError(f'invalid option IDs in {question["id"]}')
        if len({option.get('text') for option in options}) != 5:
            raise RuntimeError(f'duplicate option text in {question["id"]}')
        answer = question['correctOptionId']
        if answer not in counts:
            raise RuntimeError(f'invalid answer in {question["id"]}')
        counts[answer] += 1
        if 'Fonte:' not in question['explanation']:
            raise RuntimeError(f'missing provenance in {question["id"]}')

    print('question count:', len(questions))
    print('answer counts:', counts)
    if counts != {letter: 28 for letter in LETTERS}:
        raise RuntimeError(f'unbalanced answer key: {counts}')

    new_by_id = {item['id']: item for item in bundle['questions']}
    for question in questions[60:]:
        if new_by_id.get(question['id']) != question:
            raise RuntimeError(f'added question differs from bundle: {question["id"]}')


def patch_questions(bundle: dict) -> None:
    path = ROOT / 'questoes.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    questions = data.get('questions')
    if not isinstance(questions, list):
        raise RuntimeError('questions must be a list')

    original_ids = [f'q{number}' for number in range(3519, 3579)]
    final_ids = [f'q{number}' for number in range(3519, 3659)]
    current_ids = [item.get('id') for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle['questions'])
        if [item.get('id') for item in additions] != [f'q{number}' for number in range(3579, 3659)]:
            raise RuntimeError('new question IDs must be q3579 through q3658')
        questions.extend(additions)
    elif current_ids == final_ids:
        pass
    else:
        raise RuntimeError(f'unexpected existing question IDs/count: {len(current_ids)}')

    data['questionSetRevision'] = 2
    questions.sort(key=lambda item: int(item['id'][1:]))
    validate(data, bundle)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == '__main__':
    main()
