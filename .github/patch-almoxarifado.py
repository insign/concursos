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
    "almoxarifado-armazenamento"
)
PARTS = [
    (Path(".github/almoxarifado-bundle.part1"), 5000, "6b19b2dbeefed0bed1d20f04b81c205f61111fc7e6e8cc2f69f7083360ba3cb4"),
    (Path(".github/almoxarifado-bundle.part2"), 5000, "a70f45be7f25c2812e4a8aae0f9f219e628126292e900f5137bd2caa7724d809"),
    (Path(".github/almoxarifado-bundle.part3"), 5000, "0c96de2e5e6f9c7f344ca6554b905291682e75d97c632c4f7fe5a5f20fe2fecc"),
    (Path(".github/almoxarifado-bundle.part4"), 5000, "c3d662e035842d567cd9085b9ad52edb8e21ee61d91f52488e3506e98ca4d468"),
    (Path(".github/almoxarifado-bundle.part5"), 5000, "8f4c12ed95bf6b28c10e12df9a8aee6d09b1cdbcd7b6c6dfbe62a28a112a2c2b"),
    (Path(".github/almoxarifado-bundle.part6"), 4448, "a7ce14d6ebc8bf807b242501295bfec9eaeb79c30238b87da8e02c607bf25419"),
]
EXPECTED_PAYLOAD_SHA = "76dcbd8c2d00b7e48b81250e1c54c12761514b91a638a116c3a8e75139883b79"
EXPECTED_COMPRESSED_SHA = "3b815a7c51691192c6be0c79a6ec0ba183290a93012b5ce65b566297a9bd4696"
EXPECTED_RAW_SHA = "f25ce0bdf69b1b6b33bc1168424f339db3a1266808c55c373dda1b3b58b8ce00"
LETTERS = list("abcde")
EXISTING_TARGETS = list("ebcccecdccdcadbedabbeedaddbacaeaaeadbbbeadbcacbeed")


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
    if len(payload) != 29448:
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


def insert_after(text: str, marker: str, block: str) -> str:
    if marker not in text:
        raise RuntimeError(f"marker not found: {marker}")
    return text.replace(marker, marker + "\n\n" + block.rstrip(), 1)


def replace_heading(text: str, old: str, new: str) -> str:
    if old not in text:
        raise RuntimeError(f"heading not found: {old}")
    return text.replace(old, new, 1)


def patch_content(bundle: dict) -> None:
    path = ROOT / "conteudo.md"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r"^description: .+$",
        "description: Almoxarifado, endereçamento, slotting, armazenagem, conservação, segurança, indicadores, tecnologia e auditoria.",
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("15 de julho de 2026", "19 de julho de 2026", 1)

    if "<!-- REVISAO-ALMOXARIFADO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_control",
            "before_conservation",
            "after_techniques",
            "before_safety",
            "after_safety",
            "before_cases",
            "before_errors",
            "before_synthesis",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        for old, new in (
            ("### 4.1 Acondicionamento e acessórios", "### 4.4 Acondicionamento e acessórios"),
            ("### 4.2 Regras de arrumação da IN nº 205/1988", "### 4.5 Regras de arrumação da IN nº 205/1988"),
            ("### 4.3 Giro, seletividade e posição", "### 4.6 Giro, seletividade e posição"),
            ("### 4.4 PEPS físico e FEFO", "### 4.7 PEPS físico e FEFO"),
            ("### 4.5 Compatibilidade e segregação", "### 4.8 Compatibilidade e segregação"),
            ("### 6.1 Gestão por risco", "### 6.3 Gestão por risco"),
            ("### 6.2 NR 11: movimentação e armazenamento", "### 6.4 NR 11: movimentação e armazenamento"),
            ("### 6.3 NR 17: ergonomia", "### 6.5 NR 17: ergonomia"),
            ("### 6.4 NR 23: incêndio", "### 6.6 NR 23: incêndio"),
            ("### 6.5 NR 26: sinalização e produtos químicos", "### 6.7 NR 26: sinalização e produtos químicos"),
            ("### 6.6 Limpeza, acesso e emergência", "### 6.10 Limpeza, acesso e emergência"),
        ):
            text = replace_heading(text, old, new)

        text = insert_before(text, "## 2. Controle, registro e localização", ins["before_control"])
        text = insert_before(text, "## 3. Conservação e recuperação", ins["before_conservation"])
        text = insert_after(text, "## 4. Técnicas de armazenamento", ins["after_techniques"])
        text = insert_before(text, "## 6. Segurança", ins["before_safety"])
        text = insert_after(text, "## 6. Segurança", ins["after_safety"])
        text = insert_before(text, "### 6.10 Limpeza, acesso e emergência", ins["before_cases"])
        text = insert_before(text, "## 8. Erros recorrentes em prova", ins["before_errors"])
        text = insert_before(text, "## 9. Síntese operacional", ins["before_synthesis"])

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

    expected_ids = [f"q{number}" for number in range(1234, 1434)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1234 to q1433")

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

    original_ids = [f"q{number}" for number in range(1234, 1284)]
    final_ids = [f"q{number}" for number in range(1234, 1434)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        if len(EXISTING_TARGETS) != 50 or Counter(EXISTING_TARGETS) != Counter({letter: 10 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for question, target_id in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target_id)
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1284, 1434)]:
            raise RuntimeError("new question IDs must be q1284 through q1433")
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
