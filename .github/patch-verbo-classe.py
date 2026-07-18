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
PARTS = [Path(f".github/verbo-classe-bundle.part{i}") for i in range(1, 5)]
LETTERS = list("abcde")


def load_bundle() -> dict:
    segments: list[str] = []
    for part in PARTS:
        segment = "".join(part.read_text(encoding="utf-8").split())
        if not segment:
            raise RuntimeError(f"empty bundle segment: {part}")
        print(part, "chars=", len(segment), "sha256=", hashlib.sha256(segment.encode()).hexdigest())
        segments.append(segment)

    payload = "".join(segments)
    compressed = base64.b64decode(payload, validate=True)
    raw = bz2.decompress(compressed)
    print("payload chars:", len(payload))
    print("compressed bytes:", len(compressed), "sha256=", hashlib.sha256(compressed).hexdigest())
    print("bundle bytes:", len(raw), "sha256=", hashlib.sha256(raw).hexdigest())
    bundle = json.loads(raw.decode("utf-8"))
    if set(bundle) != {"insertions", "cheat", "questions"}:
        raise RuntimeError(f"unexpected bundle keys: {sorted(bundle)}")
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 50:
        raise RuntimeError("the bundle must contain exactly 50 new questions")
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
        "description: Estrutura verbal, formas nominais, classificações, auxiliares, vozes, valores de se, predicação e impessoalidade em questões de concursos.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-VERBO-2026 -->" not in text:
        insertions = bundle["insertions"]
        required = {
            "before_conjugacoes",
            "before_classificacao",
            "before_auxiliares",
            "before_vozes",
            "before_valores_se",
            "before_transitividade",
            "before_fronteiras",
            "references",
        }
        if set(insertions) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(insertions)}")
        text = insert_before(text, "## 2. Conjugações", insertions["before_conjugacoes"])
        text = insert_before(text, "## 4. Classificações do verbo", insertions["before_classificacao"])
        text = insert_before(text, "## 5. Locução verbal", insertions["before_auxiliares"])
        text = insert_before(text, "## 6. Vozes verbais", insertions["before_vozes"])
        text = insert_before(text, "### 6.1 Valores do `se`", insertions["before_valores_se"])
        text = insert_before(text, "## 7. Predicação e transitividade", insertions["before_transitividade"])
        text = insert_before(text, "## 9. Roteiro de prova", insertions["before_fronteiras"])
        text = insert_before(text, "## Referências", insertions["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 1000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or [item.get("id") for item in options] != LETTERS:
        raise RuntimeError(f"invalid options in {question.get('id')}")
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

    original_ids = [f"q{number}" for number in range(284, 334)]
    final_ids = [f"q{number}" for number in range(284, 384)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(334, 384)]:
            raise RuntimeError("new question IDs must be q334 through q383")
        questions.extend(additions)
    elif current_ids == final_ids:
        expected = {item["id"]: item for item in bundle["questions"]}
        for question in questions[50:]:
            if expected.get(question.get("id")) != question:
                raise RuntimeError(f"existing added question differs from bundle: {question.get('id')}")
    else:
        raise RuntimeError(f"unexpected existing question IDs/count: {len(current_ids)}")

    data["questionSetRevision"] = 3
    questions.sort(key=lambda item: int(item["id"][1:]))
    if [item.get("id") for item in questions] != final_ids:
        raise RuntimeError("question IDs must be unique and sequential from q284 to q383")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid options in {question['id']}")
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
