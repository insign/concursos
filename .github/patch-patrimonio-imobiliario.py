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
    "patrimonio-imobiliario-spiu"
)
PARTS = [
    (Path(".github/patrimonio-imobiliario-bundle.part1"), 5000, "5a52a8343882c4a6fd171695e73162030e86f2d53711858a78348501821159a8"),
    (Path(".github/patrimonio-imobiliario-bundle.part2"), 5000, "59666ed46ea541974fce980126fd01f3be87a22961420b7e281dc3ac942c5d5f"),
    (Path(".github/patrimonio-imobiliario-bundle.part3"), 5000, "f4c20dc78689541f8d2ae731267a53a946c1d50bed70fea6c272391dd2fcd6fd"),
    (Path(".github/patrimonio-imobiliario-bundle.part4"), 5000, "afb88b290f56a2a9a6038b2aee17ac9bbf5c3dee9d3b6a7faed6bfaa761846a4"),
    (Path(".github/patrimonio-imobiliario-bundle.part5"), 3804, "6d24368e4c2d4feb37755ae81a8578fed984c2bae770dfdc17b5a8216995c9da"),
]
EXPECTED_PAYLOAD_SHA = "a8820d2aae879bd683b50c69f51dacc67c06c30d5bbaf4df5a6142568b99251e"
EXPECTED_COMPRESSED_SHA = "4dfbb74ceb5f51317b6f8413097af5fda78940efe2ee74b27d259872cdfac0ba"
EXPECTED_RAW_SHA = "fcee35639ef269e3dfaf092bad0391e59c1351ae79cb5516902cd4280c7ffda3"
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
    if len(payload) != 23804:
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
        "description: Patrimônio imobiliário público, cadastro e RIP, SPIUnet e SPUnet, contabilidade atualizada, carteira, manutenção, fiscalização e auditoria.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-PATRIMONIO-IMOBILIARIO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_dimensions",
            "before_cycle",
            "before_inventory",
            "before_system_status",
            "before_accounting",
            "before_portfolio",
            "before_plan",
            "before_inspection",
            "before_indicators",
            "before_cases",
            "before_traps",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. As dimensões do controle imobiliário", ins["before_dimensions"])
        text = insert_before(text, "## 3. Ciclo de vida do imóvel público", ins["before_cycle"])
        text = insert_before(text, "## 5. Lei nº 4.320/1964 e inventário de imóveis", ins["before_inventory"])
        text = insert_before(text, "## 8. Situação dos sistemas no corte de 15 de julho de 2026", ins["before_system_status"])
        text = insert_before(text, "## 9. Contabilidade patrimonial do imóvel", ins["before_accounting"])
        text = insert_before(text, "## 10. Gestão da carteira imobiliária", ins["before_portfolio"])
        text = insert_before(text, "## 12. Plano de manutenção predial", ins["before_plan"])
        text = insert_before(text, "## 13. Inspeção, riscos e fiscalização", ins["before_inspection"])
        text = insert_before(text, "## 16. Indicadores", ins["before_indicators"])
        text = insert_before(text, "## 17. Casos integradores", ins["before_cases"])
        text = insert_before(text, "## 18. Pegadinhas de prova", ins["before_traps"])

        text = re.sub(
            r"^- \[NBC TSP 07 — Ativo Imobilizado\].*\n",
            "",
            text,
            count=1,
            flags=re.MULTILINE,
        )
        refs_marker = "## Referências\n\n"
        if refs_marker not in text:
            raise RuntimeError("references heading not found")
        text = text.replace(refs_marker, refs_marker + ins["references"].rstrip() + "\n", 1)

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 6500:
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

    expected_ids = [f"q{number}" for number in range(1034, 1184)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q1034 to q1183")

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

    original_ids = [f"q{number}" for number in range(1034, 1084)]
    final_ids = [f"q{number}" for number in range(1034, 1184)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            normalize_existing(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(1084, 1184)]:
            raise RuntimeError("new question IDs must be q1084 through q1183")
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
