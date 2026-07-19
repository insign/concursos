from __future__ import annotations

import base64
import bz2
import copy
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(
    "src/content/assuntos/tce-ma-2026-analista-administracao/"
    "conhecimentos-especificos/administracao-recursos-materiais-patrimoniais/"
    "previsao-controle-estoque"
)
PARTS = [
    (Path(".github/previsao-estoque-bundle.part1"), 5000, "afcc5ffd86f98946f24dc45351cadf3d29db1181cabfbb34d53cd23f761c80a2"),
    (Path(".github/previsao-estoque-bundle.part2"), 5000, "59ca6284efed2004329b2ea858f69be525a51db388d6a198d5249346b8fe89c7"),
    (Path(".github/previsao-estoque-bundle.part3"), 5000, "9528a2154b5acf45da90cda0a6cc11362f5510b86a81d5e109b7404116242f49"),
    (Path(".github/previsao-estoque-bundle.part4"), 5000, "74032fad77e8c95a091e752d9923e3e296299dc79fec956ba414c04a7a7e60cc"),
    (Path(".github/previsao-estoque-bundle.part5"), 5000, "fcbdf6d8b71a941a6a1a4943d5da289e4c088431490bcd3c4e0d021bdcbcef6f"),
    (Path(".github/previsao-estoque-bundle.part6"), 1228, "b297ac02be9f7c7ef828e908a5d0d15f3a9a3d1c8fa6e4efe93ad58d1b835853"),
]
EXPECTED_PAYLOAD_SHA = "659036aa396f5b7a352a8da6dd4a13ee0e70c4dbd124728e5a148bc26fb9ccbf"
EXPECTED_COMPRESSED_SHA = "43a6113afa8fae4528535ccbe91d46ade087f39d015640753ea0df96d4dacdbb"
EXPECTED_RAW_SHA = "b948fe4e146a92d47bb2fe0f5e13ac371812359d6a01cbb28633620300b316bc"
LETTERS = list("abcde")
EXISTING_TARGETS = list("dbccaddcceeacabeecaedbcbdebcbdbbdaabeebdaaacadedce")


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
    if len(payload) != 26228:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")
    if hashlib.sha256(payload.encode("utf-8")).hexdigest() != EXPECTED_PAYLOAD_SHA:
        raise RuntimeError("payload checksum mismatch")

    compressed = base64.b64decode(payload, validate=True)
    if hashlib.sha256(compressed).hexdigest() != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError("compressed payload checksum mismatch")

    raw = bz2.decompress(compressed)
    if hashlib.sha256(raw).hexdigest() != EXPECTED_RAW_SHA:
        raise RuntimeError("bundle checksum mismatch")

    bundle = json.loads(raw.decode("utf-8"))
    if set(bundle) != {"insertions", "cheat", "questions"}:
        raise RuntimeError(f"unexpected bundle keys: {sorted(bundle)}")
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 150:
        raise RuntimeError("the bundle must contain exactly 150 new questions")
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
        "description: Previsão de demanda, políticas de reposição, estoque de segurança, lote econômico, segmentação, indicadores e avaliação contábil.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-PREVISAO-ESTOQUE-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_forecast",
            "before_levels",
            "before_replenishment",
            "before_safety",
            "before_eoq",
            "before_classification",
            "before_indicators",
            "before_accounting",
            "before_cases",
            "before_traps",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Demanda e previsão", ins["before_forecast"])
        text = insert_before(text, "## 3. Níveis e posição de estoque", ins["before_levels"])
        text = insert_before(text, "## 4. Sistemas de reposição", ins["before_replenishment"])
        text = insert_before(text, "## 5. Estoque de segurança", ins["before_safety"])
        text = insert_before(text, "## 6. Lote econômico de compra", ins["before_eoq"])
        text = insert_before(text, "## 7. Classificação seletiva", ins["before_classification"])
        text = insert_before(text, "## 8. Indicadores", ins["before_indicators"])
        text = insert_before(text, "## 9. Avaliação contábil de estoques", ins["before_accounting"])
        text = insert_before(text, "## 10. Casos integrados", ins["before_cases"])
        text = insert_before(text, "## 11. Pegadinhas de prova", ins["before_traps"])

        references_marker = "## Referências\n\n"
        if references_marker not in text:
            raise RuntimeError("references heading not found")
        text = text.replace(
            references_marker,
            references_marker + ins["references"].rstrip() + "\n",
            1,
        )

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 6000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def normalize_existing(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) != 5:
        raise RuntimeError(f"invalid options in {question.get('id')}")
    if set(option.get("id") for option in options) != set(LETTERS):
        raise RuntimeError(f"invalid option IDs in {question.get('id')}")

    current_id = question.get("correctOptionId")
    correct = next((copy.deepcopy(option) for option in options if option.get("id") == current_id), None)
    others = [copy.deepcopy(option) for option in options if option.get("id") != current_id]
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

    expected_ids = [f"q{number}" for number in range(1184, 1384)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1184 to q1383")

    counts = Counter()
    for index, question in enumerate(questions):
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid option order in {question['id']}")
        if len({option.get("text") for option in options}) != 5:
            raise RuntimeError(f"duplicate option text in {question['id']}")
        answer = question["correctOptionId"]
        if answer not in LETTERS:
            raise RuntimeError(f"invalid answer in {question['id']}")
        counts[answer] += 1
        if "Fonte:" not in question["explanation"]:
            raise RuntimeError(f"missing provenance in {question['id']}")
        expected_revision = 2 if index < 50 else 1
        if question["revision"] != expected_revision:
            raise RuntimeError(f"unexpected revision in {question['id']}")

    print("question count:", len(questions))
    print("answer counts:", dict(counts))
    if counts != Counter({letter: 40 for letter in LETTERS}):
        raise RuntimeError(f"unbalanced answer key: {dict(counts)}")

    new_by_id = {item["id"]: item for item in bundle["questions"]}
    for question in questions[50:]:
        if new_by_id.get(question["id"]) != question:
            raise RuntimeError(f"added question differs from bundle: {question['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original_ids = [f"q{number}" for number in range(1184, 1234)]
    final_ids = [f"q{number}" for number in range(1184, 1384)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        if len(EXISTING_TARGETS) != 50 or Counter(EXISTING_TARGETS) != Counter({letter: 10 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for question, target_id in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target_id)
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1234, 1384)]:
            raise RuntimeError("new question IDs must be q1234 through q1383")
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
