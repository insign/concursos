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
    "conceitos-material-patrimonio"
)
PARTS = [
    (Path(".github/conceitos-material-bundle.part1"), 5000, "e4f4b7537a5af1bf451ba55a3cf02a2482f7c4a812999b91c73a4b40f3ac241b"),
    (Path(".github/conceitos-material-bundle.part2"), 5000, "413d1d1f56b77d0221862a5fa2a92019a330b6271e7f88a775eeaa75c0f37c2d"),
    (Path(".github/conceitos-material-bundle.part3"), 5000, "d878444c82f5e413ebde304f51e3fd2549cbc9a673d14c8179d8ce95d413fe62"),
    (Path(".github/conceitos-material-bundle.part4"), 5000, "bad8be0fd00c11af3afec1dc6a886dd5055cd28f453b8531d6a05e7ec9ced3a8"),
    (Path(".github/conceitos-material-bundle.part5"), 2076, "c9901bd4ef00667ee6051b044aa455f4cfa673e93adb8c70cfffb824b204fabd"),
]
EXPECTED_PAYLOAD_SHA = "37c77af407bd3a8c79f1260a5b7a0203e7ad029058752fbe8196f653745b25f9"
EXPECTED_COMPRESSED_SHA = "1f1e48d9979c1f5c272b43f180c4439ec1cc377b0ea542248a55cef8b234b228"
EXPECTED_RAW_SHA = "f745d0510e741c548e525b5b3e9ccaa87b97d757536153f4b98b0a3a03cedceb"
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
    if len(payload) != 22076:
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
        "description: Conceitos de material e patrimônio, classificações civil, orçamentária, administrativa, logística e contábil e ciclo básico integrado.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-CONCEITOS-MATERIAL-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_vocab",
            "before_consumo",
            "before_empresas",
            "before_publico",
            "before_funcoes",
            "before_aquisicao",
            "before_recebimento",
            "before_inventario",
            "before_controle",
            "before_pegadinhas",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Vocabulário essencial", ins["before_vocab"])
        text = insert_before(text, "## 3. Material de consumo e material permanente", ins["before_consumo"])
        text = insert_before(text, "## 4. Patrimônio das empresas", ins["before_empresas"])
        text = insert_before(text, "## 5. Patrimônio público", ins["before_publico"])
        text = insert_before(text, "## 8. Funções ou subsistemas básicos", ins["before_funcoes"])
        text = insert_before(text, "### 9.2 Aquisição", ins["before_aquisicao"])
        text = insert_before(text, "### 9.3 Recebimento e aceitação", ins["before_recebimento"])
        text = insert_before(text, "### 9.8 Inventário e conciliação", ins["before_inventario"])
        text = insert_before(text, "## 11. Informação, controle e segregação", ins["before_controle"])
        text = insert_before(text, "## 14. Pegadinhas de prova", ins["before_pegadinhas"])

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

    expected_ids = [f"q{number}" for number in range(984, 1134)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q984 to q1133")

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

    original_ids = [f"q{number}" for number in range(984, 1034)]
    final_ids = [f"q{number}" for number in range(984, 1134)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1034, 1134)]:
            raise RuntimeError("new question IDs must be q1034 through q1133")
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
