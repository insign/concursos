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
    "controle-movimentacao-sistema"
)
PARTS = [
    (Path(".github/controle-movimentacao-bundle.part1"), 5000, "4c5c9fc552cbbc2da122aa103fd0c6cfd9891c4423b7e608616b21f457fad95d"),
    (Path(".github/controle-movimentacao-bundle.part2"), 5000, "458fa27a9880977faee42d971cd2c782b8fb293c4ddddb9645a38758b885891b"),
    (Path(".github/controle-movimentacao-bundle.part3"), 5000, "e1c9c5b1bc0f44b5b1e809d4b1fa215381c436acebaf4e71cdfe051801fdd491"),
    (Path(".github/controle-movimentacao-bundle.part4"), 5000, "ec608d2248205947aee4997390f7e4357ead0395d8713cc7209e41b6bcedfe70"),
    (Path(".github/controle-movimentacao-bundle.part5"), 5000, "364199ef42593d6c2a1caf0264d7fa7249f8622adfd3217d2aa376642b4d164b"),
    (Path(".github/controle-movimentacao-bundle.part6"), 112, "750beadf733b3c173d31959f6c0f71c959e9447782b17b8b2c1275c814156aa5"),
]
EXPECTED_PAYLOAD_SHA = "0c0c417fcaafaee1fd4f91d05efedda2f7a79e5cd05fcb628de450551a4f2a12"
EXPECTED_COMPRESSED_SHA = "bcd205f3494c8df3fa8303c1ce0389c117763faf794e6c3632ea4f07e60d7693"
EXPECTED_RAW_SHA = "a5de5ffa0b7eaa34fab5cf1a467a737f155fb430f3bf5356aaac4f3a1604876a"
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
    if len(payload) != 25112:
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
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 120:
        raise RuntimeError("the bundle must contain exactly 120 new questions")
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
        "description: Controle patrimonial, movimentação física, administrativa, jurídica e contábil, sistemas, inventário, conciliação, indicadores e auditoria.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-CONTROLE-MOVIMENTACAO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_architecture",
            "before_movement",
            "before_flow",
            "before_system",
            "before_inventory",
            "before_risks",
            "before_cases",
            "before_traps",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Arquitetura de controles", ins["before_architecture"])
        text = insert_before(text, "## 3. O que é movimentação patrimonial", ins["before_movement"])
        text = insert_before(text, "## 4. Fluxo seguro de movimentação", ins["before_flow"])
        text = insert_before(text, "## 5. Sistema patrimonial", ins["before_system"])
        text = insert_before(text, "## 6. Inventário e conciliação", ins["before_inventory"])
        text = insert_before(text, "## 7. Riscos, controles e indicadores", ins["before_risks"])
        text = insert_before(text, "## 8. Casos integrados", ins["before_cases"])
        text = insert_before(text, "## 9. Pegadinhas de prova", ins["before_traps"])

        text = re.sub(
            r"^- CONSELHO FEDERAL DE CONTABILIDADE\. \[NBC TSP 07[^\n]*\n",
            "",
            text,
            count=1,
            flags=re.MULTILINE,
        )
        refs_marker = "## Referências\n\n"
        if refs_marker not in text:
            raise RuntimeError("references heading not found")
        text = text.replace(
            refs_marker,
            refs_marker + ins["references"].rstrip() + "\n",
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


def validate(data: dict, bundle: dict) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    expected_ids = [f"q{number}" for number in range(1134, 1304)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1134 to q1303")

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
    if counts != {letter: 34 for letter in LETTERS}:
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

    original_ids = [f"q{number}" for number in range(1134, 1184)]
    final_ids = [f"q{number}" for number in range(1134, 1304)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1184, 1304)]:
            raise RuntimeError("new question IDs must be q1184 through q1303")
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
