from __future__ import annotations

import base64
import bz2
import copy
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(
    "src/content/assuntos/tce-ma-2026-analista-administracao/"
    "conhecimentos-gerais/lingua-portuguesa/coordenacao-oracoes-termos"
)
PARTS = [
    (Path(".github/coordenacao-bundle.part1"), 5000, "0d07ed32b32573186c1896cb8b718f6517addc38d052bcd88cf970d3a72c1312"),
    (Path(".github/coordenacao-bundle.part2"), 5000, "e82453db69bdfd5fe037764cd5ef991afde7f75546b14fd6b5751b8439ad64f4"),
    (Path(".github/coordenacao-bundle.part3"), 5000, "f8cb8fb66c68210c2f0e56849542825f296ad774fdab7043d89d2025b38801ab"),
    (Path(".github/coordenacao-bundle.part4"), 1560, "fce7041a4e8ebf661c0a9d3211064320338b40310cdf2e8e4c395f9334840104"),
]
EXPECTED_COMPRESSED_SHA = "c0f40f0f0044a494555ff01405c091a0f0d2b5d42774016adbcf12af911d6d6b"
EXPECTED_RAW_SHA = "064084ddf575c7190dcc792c21489c6e1c68fe23412c3855aeb0417cfb4a3506"
LETTERS = list("ABCDE")


def load_bundle() -> dict:
    segments: list[str] = []
    for path, expected_length, expected_hash in PARTS:
        segment = "".join(path.read_text(encoding="utf-8").split())
        actual_hash = hashlib.sha256(segment.encode("utf-8")).hexdigest()
        print(path, "chars=", len(segment), "sha256=", actual_hash)
        if len(segment) != expected_length:
            raise RuntimeError(f"length mismatch for {path}: {len(segment)}")
        if actual_hash != expected_hash:
            raise RuntimeError(f"hash mismatch for {path}: {actual_hash}")
        segments.append(segment)

    payload = "".join(segments)
    if len(payload) != 16560:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")

    compressed = base64.b64decode(payload, validate=True)
    compressed_sha = hashlib.sha256(compressed).hexdigest()
    print("compressed bytes:", len(compressed), "sha256=", compressed_sha)
    if compressed_sha != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError("compressed payload checksum mismatch")

    raw = bz2.decompress(compressed)
    raw_sha = hashlib.sha256(raw).hexdigest()
    print("bundle bytes:", len(raw), "sha256=", raw_sha)
    if raw_sha != EXPECTED_RAW_SHA:
        raise RuntimeError("bundle checksum mismatch")

    bundle = json.loads(raw.decode("utf-8"))
    if set(bundle) != {"insertions", "cheat", "questions"}:
        raise RuntimeError(f"unexpected bundle keys: {sorted(bundle)}")
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 70:
        raise RuntimeError("the bundle must contain exactly 70 new questions")
    return bundle


def insert_before(text: str, marker: str, block: str) -> str:
    if marker not in text:
        raise RuntimeError(f"marker not found: {marker}")
    return text.replace(marker, block.rstrip() + "\n\n" + marker, 1)


def patch_content(bundle: dict) -> None:
    path = ROOT / "conteudo.md"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r"^description: .+$",
        "description: Coordenação de termos e orações, conectores, escopo, paralelismo, pontuação e reescrita em questões de concursos.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-COORDENACAO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_terms",
            "before_clauses",
            "before_syndetic",
            "before_additives",
            "before_adversatives",
            "before_punctuation",
            "before_method",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")
        text = insert_before(text, "## 2. Coordenação entre termos", ins["before_terms"])
        text = insert_before(text, "## 3. Coordenação entre orações", ins["before_clauses"])
        text = insert_before(text, "### 3.2 Sindética", ins["before_syndetic"])
        text = insert_before(text, "## 4. Aditivas", ins["before_additives"])
        text = insert_before(text, "## 5. Adversativas", ins["before_adversatives"])
        text = insert_before(text, "## 9. Pontuação das coordenadas", ins["before_punctuation"])
        text = insert_before(text, "## 13. Roteiro de análise", ins["before_method"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 2500:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str, existing: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if "pois" in lowered:
        candidates.append("O conector possui sempre o mesmo valor, independentemente da posição e do contexto.")
    if "mas" in lowered or "porém" in lowered or "contudo" in lowered:
        candidates.append("O articulador transforma obrigatoriamente o segundo membro em oração subordinada causal.")
    if "paralel" in lowered:
        candidates.append("O paralelismo depende apenas de os membros terem o mesmo número de palavras.")
    if "vírgula" in lowered or "pontua" in lowered:
        candidates.append("A pontuação pode ser decidida exclusivamente pela pausa prevista na leitura em voz alta.")
    if "oração" in lowered:
        candidates.append("A presença de uma conjunção basta para provar que há duas orações.")
    if "e'" in lowered or '"e"' in lowered or "conector 'e'" in lowered:
        candidates.append("A conjunção 'e' exprime somente soma neutra e jamais recebe valor contextual mais específico.")
    if "ou" in lowered:
        candidates.append("A conjunção 'ou' é necessariamente exclusiva em qualquer período.")
    if "nega" in lowered or "nem" in lowered:
        candidates.append("A negação nunca interfere no alcance dos membros coordenados.")
    candidates.extend(
        [
            "Os segmentos deixam de ser coordenados sempre que possuem extensões diferentes.",
            "A classificação decorre apenas do conector, sem necessidade de examinar a função sintática.",
            "A reescrita mantém necessariamente foco, pressuposto e hierarquia sempre que continua gramatical.",
        ]
    )
    for candidate in candidates:
        if candidate not in existing:
            return candidate
    raise RuntimeError("could not create unique fifth distractor")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or [item.get("id") for item in options] != list("ABCD"):
        raise RuntimeError(f"invalid original options in {question.get('id')}")

    options = copy.deepcopy(options)
    existing = {item.get("text", "") for item in options}
    options.append({"id": "E", "text": fifth_distractor(question.get("prompt", ""), existing)})

    current_id = question.get("correctOptionId")
    correct = next((copy.deepcopy(item) for item in options if item.get("id") == current_id), None)
    others = [copy.deepcopy(item) for item in options if item.get("id") != current_id]
    if correct is None or len(others) != 4:
        raise RuntimeError(f"cannot identify correct option in {question.get('id')}")

    reordered = []
    other_index = 0
    for option_id in LETTERS:
        if option_id == target_id:
            item = correct
        else:
            item = others[other_index]
            other_index += 1
        item["id"] = option_id
        reordered.append(item)

    question["options"] = reordered
    question["correctOptionId"] = target_id
    question["revision"] = 2
    if "Fonte:" not in question.get("explanation", ""):
        question["explanation"] = (
            question.get("explanation", "").rstrip()
            + " Fonte: questão autoral do conjunto original, revisada editorialmente."
        )


def validate(data: dict, bundle: dict) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    expected_ids = [f"q{number}" for number in range(3219, 3349)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q3219 to q3348")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid options in {question['id']}")
        if len({option.get("text") for option in options}) != 5:
            raise RuntimeError(f"duplicate option text in {question['id']}")
        answer = question["correctOptionId"]
        if answer not in counts:
            raise RuntimeError(f"invalid answer in {question['id']}")
        counts[answer] += 1
        if "Fonte:" not in question["explanation"]:
            raise RuntimeError(f"missing provenance in {question['id']}")

    print("question count:", len(questions))
    print("answer counts:", counts)
    if counts != {letter: 26 for letter in LETTERS}:
        raise RuntimeError(f"unbalanced answer key: {counts}")

    new_by_id = {item["id"]: item for item in bundle["questions"]}
    for question in questions[60:]:
        if new_by_id.get(question["id"]) != question:
            raise RuntimeError(f"added question differs from bundle: {question['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original_ids = [f"q{number}" for number in range(3219, 3279)]
    final_ids = [f"q{number}" for number in range(3219, 3349)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(3279, 3349)]:
            raise RuntimeError("new question IDs must be q3279 through q3348")
        questions.extend(additions)
    elif current_ids == final_ids:
        pass
    else:
        raise RuntimeError(f"unexpected existing question IDs/count: {len(current_ids)}")

    data["questionSetRevision"] = 2
    questions.sort(key=lambda item: int(item["id"][1:]))
    validate(data, bundle)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
