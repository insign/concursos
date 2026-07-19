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
    "conhecimentos-especificos/administracao-publica/sustentabilidade-publica"
)
PARTS = [
    (Path(".github/sustentabilidade-bundle.part1"), 5000, "64fc1fb5cc7bdb7a989e6b09f1f65b11bb04f24712a241e90e1f33f697688ad5"),
    (Path(".github/sustentabilidade-bundle.part2"), 5000, "00e0ae83579f92cff7d83cbb90fe99078615d1948cf0a845ca6d95dbcdaed9e2"),
    (Path(".github/sustentabilidade-bundle.part3"), 5000, "e4e1af9daa00a869dde28c058d465683be136b2ce2081c6df503fbec35a3ade8"),
    (Path(".github/sustentabilidade-bundle.part4"), 5000, "2ef3f3cdec87aa836c6147d6c408a86ad2c9ff4487ddeea17c541cb4ff9c81ea"),
    (Path(".github/sustentabilidade-bundle.part5"), 3424, "0dbc9d58b379aaef887e219a146687cb90139dfde8ceef234e406e38dc4179c7"),
]
EXPECTED_PAYLOAD_SHA = "45921b4101fcda74053180d32e151238e8c81cef12593b8a77b317691961f72d"
EXPECTED_COMPRESSED_SHA = "868d4b378d06c65bc93577b376b3e6d95274266f915d33e5a3fd210d149bfd36"
EXPECTED_RAW_SHA = "b710559703e1d81b1928d7ef12d36b604fceb44aa14c07d1a141beeb75b9686e"
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
    if len(payload) != 23424:
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
        "description: Sustentabilidade pública com governança, indicadores, contratações, resíduos, clima, equidade, auditoria e controle externo.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-SUSTENTABILIDADE-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_dimensions",
            "before_indicators",
            "before_procurement",
            "before_encp",
            "before_consumption",
            "before_climate",
            "before_social",
            "before_transparency",
            "before_case",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 3. Dimensões da sustentabilidade", ins["before_dimensions"])
        text = insert_before(text, "## 6. Indicadores de sustentabilidade", ins["before_indicators"])
        text = insert_before(text, "## 9. Contratações públicas sustentáveis", ins["before_procurement"])
        text = insert_before(text, "## 10. Estratégia Nacional de Contratações Públicas para o Desenvolvimento Sustentável", ins["before_encp"])
        text = insert_before(text, "## 11. Consumo racional e instalações", ins["before_consumption"])
        text = insert_before(text, "## 13. Clima, emissões e resiliência", ins["before_climate"])
        text = insert_before(text, "## 14. Dimensão social", ins["before_social"])
        text = insert_before(text, "## 15. Transparência, controle e greenwashing", ins["before_transparency"])
        text = insert_before(text, "## 16. Caso integrado", ins["before_case"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 5000:
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

    expected_ids = [f"q{number}" for number in range(884, 1034)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q884 to q1033")

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

    original_ids = [f"q{number}" for number in range(884, 934)]
    final_ids = [f"q{number}" for number in range(884, 1034)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(934, 1034)]:
            raise RuntimeError("new question IDs must be q934 through q1033")
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
