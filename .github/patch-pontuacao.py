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
    "conhecimentos-gerais/lingua-portuguesa/pontuacao"
)
PARTS = [
    (Path(".github/pontuacao-bundle.part1"), 5000, "b952f8b8fb8eca403decd530bcf7ce1772271090606d34998325204b2d652f64"),
    (Path(".github/pontuacao-bundle.part2"), 5000, "08369c793f0ca82bf76b08b610d2cf2c2728329f48b2ad0a04549afef183404d"),
    (Path(".github/pontuacao-bundle.part3"), 5000, "e8a75e19f2af66c9852e92df7ba7b8605cc85e5af84b70a60a532ab987107983"),
    (Path(".github/pontuacao-bundle.part4"), 3288, "d3856d49679b161aec67d424b521e7bb5e3a6e506e7f6cf4bdef0a225411263f"),
]
EXPECTED_COMPRESSED_SHA = "b6e3bcdd851ee2b09ff9cc0919a17537e686286408419583a6d57f7ddd0d1382"
EXPECTED_RAW_SHA = "3377e783ac1ce2cf5b8c7fdf6512118c75e791f9784d0471d688e1882f9dac5"
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
    if len(payload) != 18288:
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
        "description: Pontuação aplicada à estrutura sintática, ao escopo, aos efeitos de sentido e às reescritas cobradas em concursos.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-PONTUACAO-2026 -->" not in text:
        insertions = bundle["insertions"]
        required = {
            "before_integracoes",
            "before_subordinadas",
            "before_conectores",
            "before_ponto",
            "before_interrogacao",
            "before_metodo",
            "references",
        }
        if set(insertions) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(insertions)}")

        text = insert_before(
            text,
            "## 2. Integrações que a vírgula não deve romper",
            insertions["before_integracoes"],
        )
        text = insert_before(
            text,
            "## 5. Orações subordinadas e pontuação",
            insertions["before_subordinadas"],
        )
        text = insert_before(
            text,
            "## 6. Conectores e marcadores discursivos",
            insertions["before_conectores"],
        )
        text = insert_before(
            text,
            "## 7. Ponto e vírgula, dois-pontos e ponto",
            insertions["before_ponto"],
        )
        text = insert_before(
            text,
            "## 8. Interrogação, exclamação e reticências",
            insertions["before_interrogacao"],
        )
        text = insert_before(
            text,
            "## 11. Método de resolução",
            insertions["before_metodo"],
        )
        text = insert_before(text, "## Referências", insertions["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 2000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str, existing_texts: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if "aspas" in lowered:
        candidates.append("As aspas provam necessariamente que a expressão contém erro gramatical.")
    if "travess" in lowered:
        candidates.append("O travessão dispensa o sinal de fechamento do trecho intercalado.")
    if "parênt" in lowered:
        candidates.append("O fechamento dos parênteses cria automaticamente uma vírgula externa.")
    if "retic" in lowered:
        candidates.append("As reticências indicam sempre supressão editorial feita por quem cita.")
    if "dois-pontos" in lowered or "dois pontos" in lowered:
        candidates.append("Os dois-pontos servem apenas para representar uma pausa intermediária da leitura.")
    if "ponto e vírgula" in lowered:
        candidates.append("O ponto e vírgula pode substituir qualquer vírgula sem alterar a hierarquia do período.")
    if "vocativo" in lowered:
        candidates.append("O vocativo exerce necessariamente a função de sujeito da oração.")
    if "aposto" in lowered:
        candidates.append("Todo aposto é restritivo e, por isso, rejeita sinais de isolamento.")
    if "oração adjetiva" in lowered or "restritiva" in lowered or "explicativa" in lowered:
        candidates.append("A presença de pronome relativo torna as vírgulas obrigatórias em qualquer contexto.")
    if "conector" in lowered or "porém" in lowered or "portanto" in lowered or "pois" in lowered:
        candidates.append("Todo conector exige vírgula imediatamente depois de si, qualquer que seja sua posição.")
    if "vírgula" in lowered:
        candidates.append("A decisão deve ser tomada exclusivamente pela duração da pausa prevista na leitura.")
    candidates.extend(
        [
            "A escolha do sinal independe da estrutura sintática e dos efeitos de sentido.",
            "O sinal pode separar livremente qualquer termo deslocado, ainda que seja complemento do verbo.",
            "A extensão do segmento, por si só, torna obrigatório o emprego de vírgula.",
        ]
    )
    for candidate in candidates:
        if candidate not in existing_texts:
            return candidate
    raise RuntimeError("could not create unique fifth distractor")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or [item.get("id") for item in options] != list("ABCD"):
        raise RuntimeError(f"invalid original options in {question.get('id')}")

    existing_texts = {item.get("text", "") for item in options}
    options = copy.deepcopy(options)
    options.append({"id": "E", "text": fifth_distractor(question.get("prompt", ""), existing_texts)})

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


def validate_questions(data: dict, bundle: dict) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")

    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    expected_ids = [f"q{number}" for number in range(3339, 3469)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q3339 to q3468")

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

    original_ids = [f"q{number}" for number in range(3339, 3399)]
    final_ids = [f"q{number}" for number in range(3339, 3469)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(3399, 3469)]:
            raise RuntimeError("new question IDs must be q3399 through q3468")
        questions.extend(additions)
    elif current_ids == final_ids:
        pass
    else:
        raise RuntimeError(f"unexpected existing question IDs/count: {len(current_ids)}")

    data["questionSetRevision"] = 2
    questions.sort(key=lambda item: int(item["id"][1:]))
    validate_questions(data, bundle)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
