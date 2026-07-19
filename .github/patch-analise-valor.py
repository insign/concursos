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
    "analise-valor-alienacao"
)
PARTS = [
    (Path(".github/analise-valor-bundle.part1"), 5000, "2a1f5354d4d8a26fe49f6baba01a5cd5f43734fd57520a0b2bb0f70b08a4d067"),
    (Path(".github/analise-valor-bundle.part2"), 5000, "233f1a2b1dae77936f7a732aeb71eb5e2b90fe0269af88f20a7e1604bcc77e39"),
    (Path(".github/analise-valor-bundle.part3"), 5000, "6c1eeea456c98891fecd276816d8cc07a52389e62a8c306f270f31c1ea869f33"),
    (Path(".github/analise-valor-bundle.part4"), 5000, "1c715373e92b205ba128e55e9798f9e260558902b394833e8876520c1c77242c"),
    (Path(".github/analise-valor-bundle.part5"), 5000, "f26de8d1e1f9145e8978cbef96b51cce4468703a98645bb0f6269d95e3c55e0b"),
    (Path(".github/analise-valor-bundle.part6"), 5000, "0a6c585672cd94c7c20b8aec029b80e26c6cbb77153622dc88518f145f53e081"),
    (Path(".github/analise-valor-bundle.part7"), 476, "7f42e3b7f93aca64df12b47751c5dac5a6ee15785a09427809ca73d2d4266cbd"),
]
EXPECTED_PAYLOAD_SHA = "a499fd4239243eea67905f182d71a06121cbbf18b0e5a5c794058c7a8e50b390"
EXPECTED_COMPRESSED_SHA = "1d7194efe3b73a01bcca17e2d5304dd443f8611306e114d76257cbe7ea13fad3"
EXPECTED_RAW_SHA = "c58eb330ef47abe3f1144acf79e95f0f114fb44879ea2a936670c0f4f15b640d"
LETTERS = list("abcde")
EXISTING_TARGETS = list("bcaaceebcbeaaccddbebddaeaaababcbdedcdeaeccebcbddde")


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
    if len(payload) != 30476:
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
        "description: Metodologia de valor, funções, custo do ciclo, avaliação, alienação, leilão, circularidade, resíduos, dados, baixa e auditoria.",
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("15 de julho de 2026", "19 de julho de 2026", 1)

    if "<!-- REVISAO-ANALISE-VALOR-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_value",
            "before_functions",
            "before_lifecycle",
            "before_use_to_destination",
            "before_public_goods",
            "before_law",
            "before_auction",
            "before_federal",
            "before_evaluation",
            "before_flow",
            "before_residues",
            "before_controls",
            "before_cases",
            "before_traps",
            "before_references",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 1. Dois sentidos de valor", ins["before_value"])
        text = insert_before(text, "## 2. Funções antes de componentes", ins["before_functions"])
        text = insert_before(text, "## 4. Custo do ciclo de vida", ins["before_lifecycle"])
        text = insert_before(text, "## 5. Aplicações em materiais e patrimônio", ins["before_use_to_destination"])
        text = insert_before(text, "## 7. Natureza e alienabilidade do bem público", ins["before_public_goods"])
        text = insert_before(text, "## 8. Regime geral da Lei nº 14.133/2021", ins["before_law"])
        text = insert_before(text, "## 9. Leilão", ins["before_auction"])
        text = insert_before(text, "## 10. Referência federal de circularidade", ins["before_federal"])
        text = insert_before(text, "## 11. Avaliação para decidir e alienar", ins["before_evaluation"])
        text = insert_before(text, "## 12. Fluxo controlado de desfazimento", ins["before_flow"])
        text = insert_before(text, "## 13. Resíduos, eletroeletrônicos e dados", ins["before_residues"])
        text = insert_before(text, "## 14. Baixa e prestação de contas", ins["before_controls"])
        text = insert_before(text, "## 16. Casos integrados", ins["before_cases"])
        text = insert_before(text, "## 17. Pegadinhas de prova", ins["before_traps"])
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
    if not isinstance(cheat, str) or len(cheat) < 8000:
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

    expected_ids = [f"q{number}" for number in range(1384, 1584)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1384 to q1583")

    counts = Counter()
    prompts = set()
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
        if question["prompt"] in prompts:
            raise RuntimeError(f"duplicate prompt in {question['id']}")
        prompts.add(question["prompt"])

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

    original_ids = [f"q{number}" for number in range(1384, 1434)]
    final_ids = [f"q{number}" for number in range(1384, 1584)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        if len(EXISTING_TARGETS) != 50 or Counter(EXISTING_TARGETS) != Counter({letter: 10 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for question, target_id in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target_id)
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1434, 1584)]:
            raise RuntimeError("new question IDs must be q1434 through q1583")
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
