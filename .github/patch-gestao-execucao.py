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
    "conhecimentos-especificos/gestao-contratos/"
    "gestao-aplicada-execucao-contratual"
)
PARTS = [
    (Path(".github/gestao-execucao-bundle.part1"), 6000, "de2146983f3eaaba9abc3f1bc6d892730cff1005bb27f56b9e5380aea1116edc"),
    (Path(".github/gestao-execucao-bundle.part2"), 6000, "9c202eaf85e26ee6c23367bbdd5a76f584c20e4c82f65f8f3eee3c68e52fe694"),
    (Path(".github/gestao-execucao-bundle.part3"), 6000, "6a1db52327d7b513fe65cc5755db00c7c02d3272ccf686f10af5d2ec4f6ba784"),
    (Path(".github/gestao-execucao-bundle.part4"), 6000, "8b7817d8f62cbc76d8b833c6cbf4e6e9712eb6801578396ed8f5bd5c7710fe28"),
    (Path(".github/gestao-execucao-bundle.part5"), 2852, "3dabf68fb32d972c1953f13777c7fa46545ef838c2acc169e5c78bec0fec5a15"),
]
EXPECTED_PAYLOAD_SHA = "229ec543e7158251ed0bf5b557a89304cab62c5b4d6ba47500a57bdf88d25815"
EXPECTED_COMPRESSED_SHA = "3e1c435bd22fabd12f9baa09ce53f604426c5520d418d6c94c47b70c6a7b6387"
EXPECTED_RAW_SHA = "0a465c20fc06ea45879881396785e6a55982776bdc9dd1164f036d7bfa1c2db2"
LETTERS = list("abcde")
EXISTING_TARGETS = list("dcdcdbdacaddeecababcaadeceebbcbdaabddbcceadbcbbbecedeaaeceae")


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
    if len(payload) != 26852:
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
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 140:
        raise RuntimeError("the bundle must contain exactly 140 new questions")
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
        "description: Indicadores, SLA, IMR, evidências, fiscalização, preposto, incidentes, governança e transição na execução contratual.",
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("15 de julho de 2026", "19 de julho de 2026", 1)
    text = text.replace("16 jul. 2026", "19 jul. 2026")

    if "<!-- REVISAO-GESTAO-EXECUCAO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_observable",
            "before_indicator_examples",
            "before_integrity",
            "before_indicators_change",
            "before_fiscal_role",
            "before_fiscal_limits",
            "before_preposto",
            "before_non_subordination",
            "before_followup",
            "before_treatment",
            "before_history",
            "before_federal_model",
            "before_case",
            "before_errors",
            "before_checklist",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Do contrato ao controle observável", ins["before_observable"])
        text = insert_before(text, "### 3.3 Exemplos de indicadores", ins["before_indicator_examples"])
        text = insert_before(text, "### 3.6 Integridade dos dados", ins["before_integrity"])
        text = insert_before(text, "### 3.7 Indicadores não alteram o contrato", ins["before_indicators_change"])
        text = insert_before(text, "## 4. Papel do fiscalizador do contrato", ins["before_fiscal_role"])
        text = insert_before(text, "### 4.4 Limites da atuação", ins["before_fiscal_limits"])
        text = insert_before(text, "## 5. Papel do preposto da contratada", ins["before_preposto"])
        text = insert_before(text, "### 5.4 Canal sem subordinação trabalhista", ins["before_non_subordination"])
        text = insert_before(text, "## 6. Acompanhamento da execução contratual", ins["before_followup"])
        text = insert_before(text, "### 6.5 Tratamento de desvios", ins["before_treatment"])
        text = insert_before(text, "### 6.7 Histórico e transição", ins["before_history"])
        text = insert_before(text, "## 7. Modelo interno federal de 2026", ins["before_federal_model"])
        text = insert_before(text, "## 8. Caso integrado", ins["before_case"])
        text = insert_before(text, "## 9. Erros recorrentes e pegadinhas", ins["before_errors"])
        text = insert_before(text, "## 10. Checklist aplicado", ins["before_checklist"])

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


def fifth_distractor(prompt: str) -> str:
    lower = prompt.lower()
    if "preposto" in lower:
        return "O preposto passa a exercer competência decisória própria da Administração."
    if "fiscal" in lower or "fiscalizador" in lower:
        return "O fiscal pode alterar objeto, preço ou fórmula por comunicação informal."
    if any(term in lower for term in ("indicador", "sla", "imr", "prazo", "disponibilidade", "percentual")):
        return "A contratada pode definir a fórmula depois de conhecer o resultado, sem validação administrativa."
    return "Registro e evidência podem ser dispensados quando houver confiança entre as partes."


def normalize_existing(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) != 4:
        raise RuntimeError(f"invalid existing options in {question.get('id')}")

    current_id = question.get("correctOptionId")
    correct = next((copy.deepcopy(option) for option in options if option.get("id") == current_id), None)
    others = [copy.deepcopy(option) for option in options if option.get("id") != current_id]
    if correct is None or len(others) != 3:
        raise RuntimeError(f"cannot identify correct option in {question.get('id')}")

    extra_text = fifth_distractor(question.get("prompt", ""))
    if extra_text in {option.get("text") for option in options}:
        extra_text += " A afirmação também dispensaria qualquer registro formal."
    others.append({"id": "extra", "text": extra_text})

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

    expected_ids = [f"q{number}" for number in range(2139, 2199)] + [f"q{number}" for number in range(9000, 9140)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must preserve q2139-q2198 and add q9000-q9139")

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
        expected_revision = 2 if index < 60 else 1
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
    for question in questions[60:]:
        if new_by_id.get(question["id"]) != question:
            raise RuntimeError(f"added question differs from bundle: {question['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original_ids = [f"q{number}" for number in range(2139, 2199)]
    final_ids = original_ids + [f"q{number}" for number in range(9000, 9140)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        if len(EXISTING_TARGETS) != 60 or Counter(EXISTING_TARGETS) != Counter({letter: 12 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for question, target_id in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target_id)
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(9000, 9140)]:
            raise RuntimeError("new question IDs must be q9000 through q9139")
        questions.extend(additions)
    elif current_ids == final_ids:
        pass
    else:
        raise RuntimeError(f"unexpected existing question IDs/count: {len(current_ids)}")

    data["questionSetRevision"] = 2
    validate(data, bundle)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
