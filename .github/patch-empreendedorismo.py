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
    "conhecimentos-especificos/administracao-publica/empreendedorismo-liderancas"
)
PARTS = [
    (Path(".github/empreendedorismo-bundle.part1"), 5000, "e2cc7949c80995f3f3418fc00285541532bcbb66b389a9ef68df351e30406e7d"),
    (Path(".github/empreendedorismo-bundle.part2"), 5000, "0c2c12e867afa80e2920ec5c3bd716a3bb11334cba7fc3ddcf995ad1d97d8148"),
    (Path(".github/empreendedorismo-bundle.part3"), 5000, "67b76137f2f8e96991e1441ae98a3874d08339900eb6cb19af17887fbef2b3ef"),
    (Path(".github/empreendedorismo-bundle.part4"), 5000, "68551f976430a463b81bbcdb2bf9d3c65825f372f072aa4d64b077ac460c0e5a"),
    (Path(".github/empreendedorismo-bundle.part5"), 176, "e1b811c4751650add1ace9755c3f8623cb865f9d61a35cd8f562fc50df5a8917"),
]
EXPECTED_PAYLOAD_SHA = "7e17dd69277d5ce695910e7428ec2eeaa73561207fbba03daf9ae70fa742e694"
EXPECTED_COMPRESSED_SHA = "04de2d777c9c0ff8a571b56f652c9d4e9f4d4429709f79af4e7dd680dd1b4550"
EXPECTED_RAW_SHA = "96d9e98b49952e0e1137a3032ec8b22f2943d12a6b99caccc981de8bea455cfb"
LETTERS = list("abcde")


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
    if len(payload) != 20176:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")
    payload_sha = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    if payload_sha != EXPECTED_PAYLOAD_SHA:
        raise RuntimeError(f"payload checksum mismatch: {payload_sha}")

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
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 100:
        raise RuntimeError("the bundle must contain exactly 100 new questions")
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
        "description: Empreendedorismo público, valor público, inovação, experimentação, governança, instrumentos jurídicos e lideranças contemporâneas.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-EMPREENDEDORISMO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_value",
            "before_npm",
            "before_osborne",
            "before_cycle",
            "before_experiment",
            "before_evidence",
            "before_legal",
            "before_servant",
            "before_enap",
            "before_example",
            "before_pegadinhas",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Valor público e diferenças em relação ao setor privado", ins["before_value"])
        text = insert_before(text, "## 3. Nova Gestão Pública e abordagens posteriores", ins["before_npm"])
        text = insert_before(text, "## 4. Osborne e Gaebler: governo empreendedor", ins["before_osborne"])
        text = insert_before(text, "### 5.2 Ciclo de inovação", ins["before_cycle"])
        text = insert_before(text, "### 5.3 Experimentação responsável", ins["before_experiment"])
        text = insert_before(text, "## 6. Evidências, participação, equidade e integridade", ins["before_evidence"])
        text = insert_before(text, "## 8. Instrumentos jurídicos de inovação", ins["before_legal"])
        text = insert_before(text, "### 10.4 Servidora e stewardship", ins["before_servant"])
        text = insert_before(text, "## 13. Matriz de competências de liderança da Enap", ins["before_enap"])
        text = insert_before(text, "## 15. Exemplo integrado", ins["before_example"])
        text = insert_before(text, "## 16. Pegadinhas de prova", ins["before_pegadinhas"])
        text = insert_before(text, "## Referências", ins["references"])

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
    option_ids = [option.get("id") for option in options]
    if set(option_ids) != set(LETTERS):
        raise RuntimeError(f"invalid option IDs in {question.get('id')}: {option_ids}")

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

    expected_ids = [f"q{number}" for number in range(784, 934)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q784 to q933")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid option order in {question['id']}")
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
    if counts != {letter: 30 for letter in LETTERS}:
        raise RuntimeError(f"unbalanced answer key: {counts}")

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

    original_ids = [f"q{number}" for number in range(784, 834)]
    final_ids = [f"q{number}" for number in range(784, 934)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(834, 934)]:
            raise RuntimeError("new question IDs must be q834 through q933")
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
