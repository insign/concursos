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
    "conhecimentos-especificos/governo-eletronico-transparencia/"
    "governo-eletronico"
)
PARTS = [
    (Path(".github/governo-eletronico-bundle.part1"), 5000, "8645a74278b86d9dda38b71f91ac72bb162e1f368127bd459641bf938ea1a5d4"),
    (Path(".github/governo-eletronico-bundle.part2"), 5000, "4b0e001b1aa995a0cb2cfcb9bb2815c8a2d664dbf0e57639a4ca2d75883ec3bd"),
    (Path(".github/governo-eletronico-bundle.part3"), 5000, "274279746b1483832aec2432d2a7ceaecd20c74d6997771c2169a9940f5dbef7"),
    (Path(".github/governo-eletronico-bundle.part4"), 5000, "79d0ffb52d000303a819c06dcdc4a49ed12f53ac858d0dba325307f835d4024b"),
    (Path(".github/governo-eletronico-bundle.part5"), 3736, "df27ae442ca811a4cc16343e6b97a42511d2656ee035dc350e42b1daeb84c467"),
]
EXPECTED_PAYLOAD_SHA = "a21d8c49a95bbd0de49302ce6b662512f2f3c844aeeac8a5194d70370b787d12"
EXPECTED_COMPRESSED_SHA = "fdd4899340b943e0fe765e5fc6c93ae09c953971d5064c42624fa80a7221dd98"
EXPECTED_RAW_SHA = "d22173ee76939316d529c61e5aa8170784ef9fdc57fcb6e5d447cc2ddc4febf0"
LETTERS = list("ABCDE")
EXISTING_TARGETS = list("EADEECCBCECDDCADDEAEDBEAEABABEACAEBDBEDBCCABCBABEACDBDDDBCAC")


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
    if len(payload) != 23736:
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
        'description: "Governo eletrônico e digital, serviços, plataformas, inclusão, identidade, interoperabilidade, dados, governança e automação responsável."',
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("16 de julho de 2026", "19 de julho de 2026")
    text = text.replace("16 jul. 2026", "19 jul. 2026")

    if "<!-- REVISAO-GOVERNO-ELETRONICO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_concepts",
            "before_principles",
            "before_services",
            "before_channels",
            "before_inclusion",
            "before_identity",
            "before_interoperability",
            "before_governance",
            "before_risks",
            "before_synthesis",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Conceitos fundamentais", ins["before_concepts"])
        text = insert_before(text, "## 4. Princípios brasileiros de Governo Digital", ins["before_principles"])
        text = insert_before(text, "## 5. Serviços públicos eletrônicos", ins["before_services"])
        text = insert_before(text, "## 6. Canais e continuidade do atendimento", ins["before_channels"])
        text = insert_before(text, "## 7. Inclusão e acessibilidade", ins["before_inclusion"])
        text = insert_before(text, "## 8. Identidade, segurança, privacidade e confiança", ins["before_identity"])
        text = insert_before(text, "## 9. Interoperabilidade e integração", ins["before_interoperability"])
        text = insert_before(text, "## 10. Governança do governo eletrônico", ins["before_governance"])
        text = insert_before(text, "## 11. Riscos, limites e erros recorrentes", ins["before_risks"])
        text = insert_before(text, "## 12. Síntese para prova", ins["before_synthesis"])

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


def fifth_distractor(prompt: str) -> str:
    lower = prompt.lower()
    if "interoper" in lower or "api" in lower or "dados" in lower:
        return "A conexão técnica autoriza qualquer compartilhamento e torna desnecessária a governança."
    if "acess" in lower or "canal" in lower or "atendimento" in lower:
        return "A existência de portal torna dispensáveis testes com usuários e canais assistidos."
    if "lei" in lower or "princípio" in lower or "governo digital" in lower:
        return "A norma federal infralegal vincula automaticamente todos os entes e Poderes."
    if "ident" in lower or "autent" in lower or "assinatura" in lower:
        return "A autenticação máxima deve ser exigida indistintamente em qualquer serviço."
    return "A mera disponibilidade de tecnologia prova transformação, inclusão e geração de valor público."


def normalize_existing(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) != 4:
        raise RuntimeError(f"invalid existing options in {question.get('id')}")

    current_id = str(question.get("correctOptionId")).upper()
    normalized = [
        {"id": str(option.get("id")).upper(), "text": option.get("text")}
        for option in options
    ]
    correct = next((copy.deepcopy(option) for option in normalized if option["id"] == current_id), None)
    others = [copy.deepcopy(option) for option in normalized if option["id"] != current_id]
    if correct is None or len(others) != 3:
        raise RuntimeError(f"cannot identify correct option in {question.get('id')}")

    extra_text = fifth_distractor(question.get("prompt", ""))
    existing_texts = {option.get("text") for option in normalized}
    if extra_text in existing_texts:
        extra_text += " A afirmação também dispensaria registros de auditoria."
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
    explanation = question.get("explanation", "").rstrip()
    if "Fonte:" not in explanation:
        explanation += " Fonte: questão autoral do conjunto original, revisada editorialmente."
    if "Revisão editorial:" not in explanation:
        explanation += " Revisão editorial: quinta alternativa, balanceamento do gabarito e atualização conceitual."
    question["explanation"] = explanation


def numeric_id(qid: str) -> int | None:
    match = re.fullmatch(r"q(\d+)", qid)
    return int(match.group(1)) if match else None


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
                ids.add(qid)
    return ids


def validate(data: dict, bundle: dict, other_ids: set[str]) -> None:
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    questions = data.get("questions")
    if not isinstance(questions, list) or len(questions) != 200:
        raise RuntimeError(f"expected 200 questions, found {len(questions) if isinstance(questions, list) else 'invalid'}")

    preserved = [f"q{number}" for number in range(2259, 2319)]
    if [item.get("id") for item in questions[:60]] != preserved:
        raise RuntimeError("existing IDs q2259 to q2318 must remain in order")

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

    for stored, bundled in zip(questions[60:], bundle["questions"]):
        comparable = {key: value for key, value in stored.items() if key != "id"}
        if comparable != bundled:
            raise RuntimeError(f"added question differs from bundle: {stored['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original_ids = [f"q{number}" for number in range(2259, 2319)]
    current_ids = [item.get("id") for item in questions]
    other_ids = collect_other_ids(path)

    if current_ids == original_ids and len(questions) == 60:
        if len(EXISTING_TARGETS) != 60 or Counter(EXISTING_TARGETS) != Counter({letter: 12 for letter in LETTERS}):
            raise RuntimeError("invalid target distribution for existing questions")
        for question, target_id in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target_id)

        numeric_values = [
            number
            for qid in (other_ids | set(original_ids))
            if (number := numeric_id(qid)) is not None
        ]
        start = max(numeric_values, default=0) + 1
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
