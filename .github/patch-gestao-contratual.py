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
    (Path(".github/gestao-contratual-bundle.part1"), 5000, "a0ac94b06951d474a291cf6e7373bd8378549c48a8378f30bd7cad3df9c0c7f8"),
    (Path(".github/gestao-contratual-bundle.part2"), 5000, "34b126da5230d281ee2004a190a99eef5bbb3c52a658661770328a6cfd2543d2"),
    (Path(".github/gestao-contratual-bundle.part3"), 5000, "aa687ba2778b405e2e0435648e233e42d8690420d3a93d4ab5844ea07bd96d7f"),
    (Path(".github/gestao-contratual-bundle.part4"), 5000, "885e041b5e044b5f5162ffed685da25cfeb87a28da02ac5e721644d7411cd3a8"),
    (Path(".github/gestao-contratual-bundle.part5"), 5000, "65e6ae3df88077a4cf5a49b241c31eea72de0bd311866229591024cc9b4510d8"),
    (Path(".github/gestao-contratual-bundle.part6"), 2748, "30e53be605b0b7e750823bf220a878d4bcc9334bb6841693633408104fba3d65"),
]
EXPECTED_PAYLOAD_SHA = "8fca4bdf6461b66c96649308226da11a407061881dc95156ea4fede4173164f5"
EXPECTED_COMPRESSED_SHA = "36d673db1c8b6f462575450c4de6b1a38399d686658fb775e17239fd7d19c5c0"
EXPECTED_RAW_SHA = "0ce31fca5a41b329c93b9d3238ec8c861ab1d98bf999dca5f366c56618f553c7"
LETTERS = list("ABCDE")
EXISTING_TARGETS = list("CDDAAACEEEDEBECDBDDBACAEEAEEBCCEEABDBDAACBBDCBDAECCABCDABDCB")

EXTRA_DISTRACTORS = [
    "A meta pode ser alterada retroativamente pelo fiscal depois de conhecido o resultado.",
    "O relatório da contratada é prova incontestável e dispensa validação administrativa.",
    "A correção do serviço apaga a ocorrência e impede qualquer outro tratamento.",
    "O preposto representa a Administração e pode decidir pleitos em nome do órgão.",
    "A existência de sistema eletrônico substitui a definição da população e da fórmula.",
    "A assistência de terceiro transfere integralmente a responsabilidade funcional do fiscal.",
    "Toda ordem direta a empregado terceirizado é válida quando o serviço ocorre no órgão.",
    "A reunião inicial pode modificar preço, objeto e meta sem instrumento competente.",
    "A média mensal adequada prova que todos os eventos ficaram dentro do prazo.",
    "O fiscal pode aplicar sanção sem contraditório quando a falha está registrada.",
    "A troca do fiscal reinicia prazos, medições e ocorrências do contrato.",
    "O Contratos.gov.br é obrigatório para todos os entes federativos.",
    "A contratada pode selecionar sozinha a amostra porque conhece melhor a execução.",
    "Restauração temporária e resolução definitiva são sempre o mesmo evento.",
    "Captura de tela isolada prova, por si só, disponibilidade durante todo o mês.",
    "O indicador dispensa vínculo com obrigação quando possui fórmula matemática.",
    "A severidade pode ser reclassificada no fechamento sem trilha de alteração.",
    "Qualquer redimensionamento do pagamento constitui automaticamente multa.",
    "O apoio técnico contratado passa a decidir pelo fiscal e pela autoridade.",
    "O preposto aceito no início é imutável até o término do contrato.",
]


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
    if len(payload) != 27748:
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
        'description: "Indicadores, SLA, IMR, evidências, fiscalização, preposto, incidentes, governança, transição e acompanhamento da execução contratual."',
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("15 de julho de 2026", "19 de julho de 2026", 1)
    text = text.replace("15 jul. 2026", "19 jul. 2026")
    text = text.replace("16 jul. 2026", "19 jul. 2026")

    if "<!-- REVISAO-GESTAO-APLICADA-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_control",
            "before_indicators",
            "before_components",
            "before_examples",
            "before_ranges",
            "before_fiscal_action",
            "before_limits",
            "before_direct_orders",
            "before_followup",
            "before_kickoff",
            "before_deviations",
            "before_transition",
            "before_cases",
            "before_traps",
            "before_references",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Do contrato ao controle observável", ins["before_control"])
        text = insert_before(text, "## 3. Cláusulas e indicadores de nível de serviço", ins["before_indicators"])
        text = insert_before(text, "### 3.2 Componentes de um indicador auditável", ins["before_components"])
        text = insert_before(text, "### 3.3 Exemplos de indicadores", ins["before_examples"])
        text = insert_before(text, "### 3.4 Metas, tolerâncias e faixas", ins["before_ranges"])
        text = insert_before(text, "### 4.3 Atuação durante a execução", ins["before_fiscal_action"])
        text = insert_before(text, "### 4.4 Limites da atuação", ins["before_limits"])
        text = insert_before(text, "### 5.4 Canal sem subordinação trabalhista", ins["before_direct_orders"])
        text = insert_before(text, "## 6. Acompanhamento da execução contratual", ins["before_followup"])
        text = insert_before(text, "### 6.2 Reunião inicial", ins["before_kickoff"])
        text = insert_before(text, "### 6.5 Tratamento de desvios", ins["before_deviations"])
        text = insert_before(text, "### 6.7 Histórico e transição", ins["before_transition"])
        text = insert_before(text, "## 8. Caso integrado", ins["before_cases"])
        text = insert_before(text, "## 9. Erros recorrentes e pegadinhas", ins["before_traps"])
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


def choose_extra_distractor(question: dict, index: int) -> dict:
    existing = {option.get("text") for option in question["options"]}
    for offset in range(len(EXTRA_DISTRACTORS)):
        text = EXTRA_DISTRACTORS[(index + offset) % len(EXTRA_DISTRACTORS)]
        if text not in existing:
            return {"id": "E", "text": text}
    raise RuntimeError(f"could not choose extra distractor for {question.get('id')}")


def normalize_existing(question: dict, target_id: str, index: int) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) not in {4, 5}:
        raise RuntimeError(f"invalid options in {question.get('id')}")

    original_ids = [str(option.get("id")).upper() for option in options]
    if len(set(original_ids)) != len(original_ids):
        raise RuntimeError(f"duplicate option IDs in {question.get('id')}")

    current_id = str(question.get("correctOptionId")).upper()
    normalized = [
        {"id": str(option.get("id")).upper(), "text": option.get("text")}
        for option in options
    ]
    correct = next((copy.deepcopy(option) for option in normalized if option["id"] == current_id), None)
    others = [copy.deepcopy(option) for option in normalized if option["id"] != current_id]
    if correct is None:
        raise RuntimeError(f"cannot identify correct option in {question.get('id')}")

    if len(normalized) == 4:
        others.append(choose_extra_distractor({"options": normalized, "id": question.get("id")}, index))
    if len(others) != 4:
        raise RuntimeError(f"invalid distractor count in {question.get('id')}")

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
    explanation = question.get("explanation", "").rstrip()
    if "Fonte:" not in explanation:
        explanation += " Fonte: questão autoral do conjunto original, revisada editorialmente."
    elif "revisada editorialmente" not in explanation:
        explanation += " Revisão editorial: inclusão de quinta alternativa, balanceamento e atualização da explicação."
    question["explanation"] = explanation


def collect_other_ids(target_path: Path) -> set[str]:
    ids: set[str] = set()
    for path in Path("src/content/assuntos").rglob("questoes.json"):
        if path.resolve() == target_path.resolve():
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise RuntimeError(f"cannot parse {path}: {exc}") from exc
        for question in data.get("questions", []):
            qid = question.get("id")
            if isinstance(qid, str):
                if qid in ids:
                    raise RuntimeError(f"duplicate ID already present outside target: {qid}")
                ids.add(qid)
    return ids


def numeric_id(qid: str) -> int | None:
    match = re.fullmatch(r"q(\d+)", qid)
    return int(match.group(1)) if match else None


def validate(data: dict, bundle: dict, other_ids: set[str]) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    questions = data.get("questions")
    if not isinstance(questions, list) or len(questions) != 200:
        raise RuntimeError(f"expected 200 questions, found {len(questions) if isinstance(questions, list) else 'invalid'}")

    preserved = [f"q{number}" for number in range(2139, 2199)]
    if [item.get("id") for item in questions[:60]] != preserved:
        raise RuntimeError("existing IDs q2139 to q2198 must remain in order")

    new_ids = [item.get("id") for item in questions[60:]]
    new_numbers = [numeric_id(qid) for qid in new_ids]
    if any(number is None for number in new_numbers):
        raise RuntimeError("new IDs must use q<number>")
    if new_numbers != list(range(new_numbers[0], new_numbers[0] + 140)):
        raise RuntimeError("new IDs must form one contiguous block")
    if set(new_ids) & other_ids:
        raise RuntimeError("new question range overlaps IDs used elsewhere")

    counts = Counter()
    prompts = set()
    all_ids = set()
    for index, question in enumerate(questions):
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        if question["id"] in all_ids:
            raise RuntimeError(f"duplicate ID in target: {question['id']}")
        all_ids.add(question["id"])

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

        prompt = question["prompt"]
        if prompt in prompts:
            raise RuntimeError(f"duplicate prompt in {question['id']}")
        prompts.add(prompt)

    print("question count:", len(questions))
    print("answer counts:", dict(counts))
    print("new ID range:", new_ids[0], "to", new_ids[-1])
    if counts != Counter({letter: 40 for letter in LETTERS}):
        raise RuntimeError(f"unbalanced answer key: {dict(counts)}")

    bundle_questions = bundle["questions"]
    for stored, bundled in zip(questions[60:], bundle_questions):
        comparable = {key: value for key, value in stored.items() if key != "id"}
        if comparable != bundled:
            raise RuntimeError(f"added question differs from bundle: {stored['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original_ids = [f"q{number}" for number in range(2139, 2199)]
    current_ids = [item.get("id") for item in questions]
    other_ids = collect_other_ids(path)

    if current_ids == original_ids and len(questions) == 60:
        if len(EXISTING_TARGETS) != 60 or Counter(EXISTING_TARGETS) != Counter({letter: 12 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for index, (question, target_id) in enumerate(zip(questions, EXISTING_TARGETS)):
            normalize_existing(question, target_id, index)

        all_numeric = [
            number
            for qid in (other_ids | set(original_ids))
            if (number := numeric_id(qid)) is not None
        ]
        start = max(all_numeric, default=0) + 1
        additions = copy.deepcopy(bundle["questions"])
        for offset, question in enumerate(additions):
            question["id"] = f"q{start + offset}"
        questions.extend(additions)
    elif len(questions) == 200 and current_ids[:60] == original_ids:
        pass
    else:
        raise RuntimeError(f"unexpected existing question IDs/count: {len(current_ids)}")

    data["questionSetRevision"] = 2
    validate(data, bundle, other_ids)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
