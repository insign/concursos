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
    "conhecimentos-especificos/administracao-recursos-materiais-patrimoniais/"
    "patrimonio-mobiliario-responsabilidade"
)
PARTS = [
    (Path(".github/patrimonio-mobiliario-v2.part1"), 5000, "3623584fab64e67a65883e13dac7dcc3fd6c151c30c3d2e2221e5846fe75670e"),
    (Path(".github/patrimonio-mobiliario-v2.part2"), 5000, "f5d4caf8c2f32582d9e4d9684a97dd7c516b4ef6ba7a93f2e1da5a996c641025"),
    (Path(".github/patrimonio-mobiliario-v2.part3"), 5000, "b8f47fe8988bdbc1a19b441de7fc3dd7ad7f5672ae451d688479acf35d5bad52"),
    (Path(".github/patrimonio-mobiliario-v2.part4"), 5000, "e06b95780a0c3f0b5ddad1fd4e46dbac3a2c01869f9884ff18dec280a0381b3e"),
    (Path(".github/patrimonio-mobiliario-v2.part5"), 4056, "4acc2d2a1238f651c19735ce77483b287e5cf3055ec83f42a5d9e2dec5dd42c4"),
]
EXPECTED_PAYLOAD_SHA = "62b84c7a20ffcf15ad8f672a1f6fb48542784c5f9c13433bce39f781c3ab91de"
EXPECTED_COMPRESSED_SHA = "a4ee7529e3de491a9c10f2bbc25e0580fa21b339206116da00f4028d961b93bf"
EXPECTED_RAW_SHA = "d9df16efbbffc43fdf691c61d998efe30473d61bc7f927482137688bdd2d8c3e"
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
    if len(payload) != 24056:
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
        "description: Patrimônio mobiliário, carga e guarda, responsabilidade civil e administrativa, apuração, prevenção, inventário e controle.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-PATRIMONIO-MOBILIARIO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_dimensions",
            "before_identification",
            "before_duties",
            "before_responsibility",
            "before_civil",
            "before_administrative",
            "before_spheres",
            "before_apuration",
            "before_cases",
            "before_prevention",
            "before_traps",
            "before_references",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Dimensões do controle do bem móvel", ins["before_dimensions"])
        text = insert_before(text, "## 4. Identificação, carga, guarda, uso e propriedade", ins["before_identification"])
        text = insert_before(text, "## 5. Deveres de cuidado e comunicação", ins["before_duties"])
        text = insert_before(text, "## 6. O que significa responsabilidade", ins["before_responsibility"])
        text = insert_before(text, "## 7. Responsabilidade civil e ressarcimento", ins["before_civil"])
        text = insert_before(text, "## 8. Responsabilidade administrativa", ins["before_administrative"])
        text = insert_before(text, "## 9. Esferas que podem coexistir", ins["before_spheres"])
        text = insert_before(text, "## 10. Apuração de desaparecimento, dano ou uso indevido", ins["before_apuration"])
        text = insert_before(text, "## 11. Casos aplicados", ins["before_cases"])
        text = insert_before(text, "## 12. Prevenção e governança", ins["before_prevention"])
        text = insert_before(text, "## 13. Pegadinhas de prova", ins["before_traps"])
        text = insert_before(text, "## Referências", ins["before_references"])

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
    if not isinstance(cheat, str) or len(cheat) < 7000:
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


def has_provenance(explanation: str) -> bool:
    markers = ("Fonte:", "Inspirada", "Questão autoral", "Adaptada")
    return any(marker in explanation for marker in markers)


def validate(data: dict, bundle: dict) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    expected_ids = [f"q{number}" for number in range(1084, 1234)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1084 to q1233")

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
        if not has_provenance(question["explanation"]):
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

    original_ids = [f"q{number}" for number in range(1084, 1134)]
    final_ids = [f"q{number}" for number in range(1084, 1234)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1134, 1234)]:
            raise RuntimeError("new question IDs must be q1134 through q1233")
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
