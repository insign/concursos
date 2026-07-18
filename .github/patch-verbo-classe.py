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
    "conhecimentos-gerais/lingua-portuguesa/verbo-como-classe-de-palavras"
)
PARTS = [
    (Path(".github/verbo-classe-bundle.part1"), 5000, "93996ba0c3cb4f46b797cef0c2ce7f03e515745665749838f97c8a85ca27a889"),
    (Path(".github/verbo-classe-bundle.part2"), 5000, "2211a555781ddde9aa2271398315174c0418bd1b2497dabd31ab5b8e14207b24"),
    (Path(".github/verbo-classe-bundle.part3"), 4424, "576b9f195994b3f996647e067648831bb13094e74fabcdda120f19cf0ddfe28b"),
]
EXPECTED_COMPRESSED_SHA = "ebfc48e25b168baa8b35876a75c780c6eb9c4317d8644aa8894e3b89db80fb33"
EXPECTED_RAW_SHA = "2d699fbc879a05d51d6ea56f4bde289dcbb8bed67edceac336adfde5924fead7"
LETTERS = list("abcde")


def load_bundle() -> dict:
    segments: list[str] = []
    for path, expected_length, expected_hash in PARTS:
        segment = path.read_text(encoding="utf-8").strip()
        actual_hash = hashlib.sha256(segment.encode("utf-8")).hexdigest()
        print(path, len(segment), actual_hash)
        if len(segment) != expected_length:
            raise RuntimeError(f"length mismatch for {path}: {len(segment)}")
        if actual_hash != expected_hash:
            raise RuntimeError(f"hash mismatch for {path}: {actual_hash}")
        segments.append(segment)

    payload = "".join(segments)
    if len(payload) != 14424:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")

    compressed = base64.b64decode(payload, validate=True)
    compressed_sha = hashlib.sha256(compressed).hexdigest()
    print("compressed bytes:", len(compressed))
    print("compressed sha256:", compressed_sha)
    if compressed_sha != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError("compressed payload checksum mismatch")

    raw = bz2.decompress(compressed)
    raw_sha = hashlib.sha256(raw).hexdigest()
    print("bundle bytes:", len(raw))
    print("bundle sha256:", raw_sha)
    if raw_sha != EXPECTED_RAW_SHA:
        raise RuntimeError("bundle checksum mismatch")

    return json.loads(raw.decode("utf-8"))


def insert_before(text: str, marker: str, block: str) -> str:
    if marker not in text:
        raise RuntimeError(f"marker not found: {marker}")
    return text.replace(marker, block.rstrip() + "\n\n" + marker, 1)


def patch_content(bundle: dict) -> None:
    path = ROOT / "conteudo.md"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r"^description: .+$",
        "description: Estrutura verbal, formas nominais, classificações, auxiliares, vozes, valores de se, predicação e impessoalidade em questões de concursos.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-VERBO-2026 -->" not in text:
        ins = bundle["insertions"]
        text = insert_before(text, "## 2. Conjugações", ins["before_conjugacoes"])
        text = insert_before(text, "## 4. Classificações do verbo", ins["before_classificacao"])
        text = insert_before(text, "## 5. Locução verbal", ins["before_auxiliares"])
        text = insert_before(text, "## 6. Vozes verbais", ins["before_vozes"])
        text = insert_before(text, "### 6.1 Valores do `se`", ins["before_valores_se"])
        text = insert_before(text, "## 7. Predicação e transitividade", ins["before_transitividade"])
        text = insert_before(text, "## 9. Roteiro de prova", ins["before_fronteiras"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    (ROOT / "cheat-sheet.md").write_text(bundle["cheat"].rstrip() + "\n", encoding="utf-8")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) != 5:
        raise RuntimeError(f"invalid options in {question.get('id')}")

    current_id = question.get("correctOptionId")
    correct = None
    others = []
    for option in options:
        item = copy.deepcopy(option)
        if item.get("id") == current_id:
            correct = item
        else:
            others.append(item)
    if correct is None or len(others) != 4:
        raise RuntimeError(f"cannot find correct option in {question.get('id')}")

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
    question["revision"] = 3
    if "Fonte:" not in question.get("explanation", ""):
        question["explanation"] = (
            question.get("explanation", "").rstrip()
            + " Fonte: questão autoral do conjunto original, revisada editorialmente."
        )


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    ids = [question.get("id") for question in questions]
    original_ids = [f"q{number}" for number in range(284, 334)]
    final_ids = [f"q{number}" for number in range(284, 384)]

    if ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = bundle.get("questions")
        if not isinstance(additions, list) or len(additions) != 50:
            raise RuntimeError("expected 50 new questions")
        questions.extend(copy.deepcopy(additions))
    elif ids == final_ids:
        additions_by_id = {item["id"]: item for item in bundle.get("questions", [])}
        for question in questions[50:]:
            expected = additions_by_id.get(question.get("id"))
            if expected is None or question != expected:
                raise RuntimeError(f"existing new question differs from bundle: {question.get('id')}")
    else:
        raise RuntimeError(f"unexpected question IDs/count: {len(ids)}")

    data["questionSetRevision"] = 3
    questions.sort(key=lambda item: int(item["id"][1:]))

    actual_ids = [question.get("id") for question in questions]
    if actual_ids != final_ids:
        raise RuntimeError("question IDs must be unique and sequential from q284 to q383")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        if set(question) != {
            "id",
            "revision",
            "prompt",
            "options",
            "correctOptionId",
            "explanation",
        }:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid option IDs in {question['id']}")
        answer = question["correctOptionId"]
        if answer not in counts:
            raise RuntimeError(f"invalid answer in {question['id']}")
        counts[answer] += 1
        if "Fonte:" not in question["explanation"]:
            raise RuntimeError(f"missing provenance in {question['id']}")

    print("question count:", len(questions))
    print("answer counts:", counts)
    if counts != {letter: 20 for letter in LETTERS}:
        raise RuntimeError(f"unbalanced answer key: {counts}")

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
