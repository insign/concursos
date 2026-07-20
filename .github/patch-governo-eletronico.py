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
    (Path(".github/governo-eletronico-bundle.part1"), 4000, "350da45ff78292beacf76fc23df97148adda4e47c6f010fa3fbb95f8f01d3a3c"),
    (Path(".github/governo-eletronico-bundle.part2"), 4000, "dac22da11408caec836de73bc7013e3d4d37be521a16ac71e2966e79a8076251"),
    (Path(".github/governo-eletronico-bundle.part3"), 4000, "9562e45366e285bc379b0fe661e2f4d9e83e649aa8285a781ca3e6975f6fbe0a"),
    (Path(".github/governo-eletronico-bundle.part4"), 4000, "dc988bfa7ea172111cf6795837ae07d8b9e766045572ded56dfee7b5fbf36593"),
    (Path(".github/governo-eletronico-bundle.part5"), 3856, "1aa76853c16abced455f476c80baf95cc2f91ed71c04216ac6fa9b33169d1629"),
]
EXPECTED_PAYLOAD_SHA = "9732e0c40736ff6cab4858679e075c0d487e462a4663ea94701c4381da94729d"
EXPECTED_COMPRESSED_SHA = "6848b765de0ffa8ece7b6ee0fc635bb646e1ea8ecdb6fc2eabb6a6cd4a76985e"
EXPECTED_RAW_SHA = "e52f26274df9198bf405b2c5deae6aff4f3f83056c6ca4d897ecbcc7b45a6502"
LETTERS = list("abcde")
EXISTING_TARGETS = list("cdcbecaddaaedececcdbbbbabbaaeeccdbcecdbadaebeebdaaacabddedce")


def load_bundle() -> dict:
    segments = []
    for path, expected_length, expected_hash in PARTS:
        segment = "".join(path.read_text(encoding="utf-8").split())
        digest = hashlib.sha256(segment.encode("utf-8")).hexdigest()
        print(path, "chars=", len(segment), "sha256=", digest)
        if len(segment) != expected_length:
            raise RuntimeError(f"length mismatch for {path}: {len(segment)}")
        if digest != expected_hash:
            raise RuntimeError(f"hash mismatch for {path}: {digest}")
        segments.append(segment)

    payload = "".join(segments)
    if len(payload) != 19856:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")
    if hashlib.sha256(payload.encode("utf-8")).hexdigest() != EXPECTED_PAYLOAD_SHA:
        raise RuntimeError("payload checksum mismatch")

    compressed = base64.b64decode(payload, validate=True)
    if hashlib.sha256(compressed).hexdigest() != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError("compressed checksum mismatch")
    raw = bz2.decompress(compressed)
    if hashlib.sha256(raw).hexdigest() != EXPECTED_RAW_SHA:
        raise RuntimeError("raw bundle checksum mismatch")

    bundle = json.loads(raw.decode("utf-8"))
    if set(bundle) != {"insertions", "cheat", "questions"}:
        raise RuntimeError(f"unexpected bundle keys: {sorted(bundle)}")
    if len(bundle["questions"]) != 140:
        raise RuntimeError("bundle must contain 140 questions")
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
        'description: "Governo eletrônico, governo digital, serviços, plataformas, inclusão, identidade, interoperabilidade, dados, IA, governança e indicadores."',
        text,
        count=1,
        flags=re.MULTILINE,
    )
    text = text.replace("16 de julho de 2026", "20 de julho de 2026", 1)
    text = text.replace("16 jul. 2026", "20 jul. 2026")

    if "<!-- REVISAO-GOVERNO-ELETRONICO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_models",
            "before_services",
            "before_channels",
            "before_identity",
            "before_interop",
            "before_governance",
            "before_risks",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 3. Modelos e maturidade", ins["before_models"])
        text = insert_before(text, "## 5. Serviços públicos eletrônicos", ins["before_services"])
        text = insert_before(text, "## 6. Canais e continuidade do atendimento", ins["before_channels"])
        text = insert_before(text, "## 8. Identidade, segurança, privacidade e confiança", ins["before_identity"])
        text = insert_before(text, "## 9. Interoperabilidade e integração", ins["before_interop"])
        text = insert_before(text, "## 10. Governança do governo eletrônico", ins["before_governance"])
        text = insert_before(text, "## 11. Riscos, limites e erros recorrentes", ins["before_risks"])

        marker = "## Referências\n\n"
        if marker not in text:
            raise RuntimeError("references heading not found")
        text = text.replace(marker, marker + ins["references"].rstrip() + "\n", 1)

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 7000:
        raise RuntimeError("invalid cheat sheet")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str) -> str:
    lower = prompt.lower()
    if "interoper" in lower or "api" in lower:
        return "A conexão técnica autoriza compartilhar dados sem finalidade ou base jurídica."
    if "acess" in lower or "inclus" in lower:
        return "A aprovação em validador automático comprova integralmente a acessibilidade."
    if "lei nº 14.129" in lower or "âmbito" in lower:
        return "A regra federal vincula automaticamente qualquer tribunal de contas estadual."
    if "egdi" in lower:
        return "O índice certifica individualmente cada serviço e órgão público."
    return "A existência de tecnologia dispensa governança, evidência e avaliação de resultados."


def normalize_existing(question: dict, target: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or len(options) != 4:
        raise RuntimeError(f"invalid existing options in {question.get('id')}")
    current = str(question.get("correctOptionId")).lower()
    normalized = [{"id": str(o.get("id")).lower(), "text": o.get("text")} for o in options]
    correct = next((copy.deepcopy(o) for o in normalized if o["id"] == current), None)
    others = [copy.deepcopy(o) for o in normalized if o["id"] != current]
    if correct is None or len(others) != 3:
        raise RuntimeError(f"cannot locate correct option in {question.get('id')}")
    extra = fifth_distractor(question.get("prompt", ""))
    if extra in {o["text"] for o in normalized}:
        extra += " A afirmação também eliminaria o dever de registrar o uso."
    others.append({"id": "extra", "text": extra})

    reordered = []
    oi = 0
    for letter in LETTERS:
        if letter == target:
            item = correct
        else:
            item = others[oi]
            oi += 1
        item["id"] = letter
        reordered.append(item)

    question["options"] = reordered
    question["correctOptionId"] = target
    question["revision"] = 2
    explanation = question.get("explanation", "").rstrip()
    if "Fonte:" not in explanation:
        explanation += " Fonte: questão autoral do conjunto original."
    explanation += " Revisão editorial: quinta alternativa, balanceamento e atualização da explicação."
    question["explanation"] = explanation


def validate(data: dict, bundle: dict) -> None:
    questions = data.get("questions")
    if data.get("questionSetRevision") != 2:
        raise RuntimeError("questionSetRevision must be 2")
    if not isinstance(questions, list) or len(questions) != 200:
        raise RuntimeError(f"expected 200 questions, found {len(questions) if isinstance(questions, list) else 'invalid'}")

    expected_ids = [f"q{n}" for n in range(2259, 2319)] + [f"q{n}" for n in range(10000, 10140)]
    if [q.get("id") for q in questions] != expected_ids:
        raise RuntimeError("unexpected question IDs")

    counts = Counter()
    prompts = set()
    for index, question in enumerate(questions):
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}")
        options = question["options"]
        if [o.get("id") for o in options] != LETTERS:
            raise RuntimeError(f"invalid option order in {question['id']}")
        if len({o.get("text") for o in options}) != 5:
            raise RuntimeError(f"duplicate option text in {question['id']}")
        answer = question["correctOptionId"]
        counts[answer] += 1
        expected_revision = 2 if index < 60 else 1
        if question["revision"] != expected_revision:
            raise RuntimeError(f"invalid revision in {question['id']}")
        if "Fonte:" not in question["explanation"]:
            raise RuntimeError(f"missing provenance in {question['id']}")
        if question["prompt"] in prompts:
            raise RuntimeError(f"duplicate prompt in {question['id']}")
        prompts.add(question["prompt"])

    expected_counts = Counter({letter: 40 for letter in LETTERS})
    print("question count:", len(questions))
    print("answer counts:", dict(counts))
    if counts != expected_counts:
        raise RuntimeError(f"unbalanced answer key: {dict(counts)}")

    new_by_id = {q["id"]: q for q in bundle["questions"]}
    for question in questions[60:]:
        if new_by_id.get(question["id"]) != question:
            raise RuntimeError(f"new question differs from bundle: {question['id']}")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    original = [f"q{n}" for n in range(2259, 2319)]
    final = original + [f"q{n}" for n in range(10000, 10140)]
    current = [q.get("id") for q in questions]

    if current == original:
        if len(EXISTING_TARGETS) != 60 or Counter(EXISTING_TARGETS) != Counter({letter: 12 for letter in LETTERS}):
            raise RuntimeError("invalid existing answer targets")
        for question, target in zip(questions, EXISTING_TARGETS):
            normalize_existing(question, target)
        additions = copy.deepcopy(bundle["questions"])
        questions.extend(additions)
    elif current == final:
        pass
    else:
        raise RuntimeError(f"unexpected current question set: {len(current)}")

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
