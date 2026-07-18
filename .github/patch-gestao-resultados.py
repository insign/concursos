from __future__ import annotations

import base64
import bz2
import hashlib
import json
import re
from pathlib import Path

ROOT = Path("src/content/assuntos/tce-ma-2026-analista-administracao/conhecimentos-especificos/administracao-publica/gestao-resultados-publica-privada-paradigma-cliente")
PARTS = [Path(f".github/gestao-resultados-bundle.part{i}") for i in range(1, 4)]
EXPECTED_COMPRESSED_SHA = "287b107b74a72bfb5c6209aa458d4442238bd416dbd63a838b834d02b18f5056"
EXPECTED_RAW_SHA = "18950ee70f3d13cd30db612a139e8370298cd80308368fdf3bb21e168a63883d"


def load_bundle() -> dict:
    payload = "".join(part.read_text(encoding="utf-8").strip() for part in PARTS)
    if len(payload) != 17248:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")
    compressed = base64.b64decode(payload, validate=True)
    compressed_sha = hashlib.sha256(compressed).hexdigest()
    if compressed_sha != EXPECTED_COMPRESSED_SHA:
        raise RuntimeError(f"compressed checksum mismatch: {compressed_sha}")
    raw = bz2.decompress(compressed)
    raw_sha = hashlib.sha256(raw).hexdigest()
    if raw_sha != EXPECTED_RAW_SHA:
        raise RuntimeError(f"bundle checksum mismatch: {raw_sha}")
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
        "description: Gestão orientada a resultados, 6Es, indicadores, avaliação, valor público, comparação público-privado e serviços centrados em pessoas e direitos.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-RESULTADOS-2026 -->" not in text:
        ins = bundle["insertions"]
        text = insert_before(text, "## 3. Dimensões do desempenho", ins["before_dimensions"])
        text = insert_before(text, "## 4. Indicadores e sistema de medição", ins["before_indicators"])
        text = insert_before(text, "## 5. Ciclo de gestão de resultados", ins["before_cycle"])
        text = insert_before(text, "## 6. Monitoramento, avaliação e aprendizagem", ins["before_monitoring"])
        text = insert_before(text, "## 8. Gestão pública e gestão privada: convergências", ins["before_public_private"])
        text = insert_before(text, "### 9.1 Evitar falsos absolutos", ins["before_false_absolutes"])
        text = insert_before(text, "## 12. Lei nº 13.460/2017 e orientação a resultados", ins["before_law"])
        text = insert_before(text, "### 13.2 Ouvidoria", ins["before_ouvidoria"])
        text = text.rstrip() + "\n" + ins["references"].rstrip() + "\n"

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    (ROOT / "cheat-sheet.md").write_text(bundle["cheat"].rstrip() + "\n", encoding="utf-8")


def patch_questions(bundle: dict) -> None:
    path = ROOT / "questoes.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["questionSetRevision"] = 2

    questions = data.get("questions")
    if not isinstance(questions, list):
        raise RuntimeError("questions must be a list")

    by_id = {question["id"]: question for question in questions}
    if len(by_id) != len(questions):
        raise RuntimeError("duplicate existing question IDs")

    for question in bundle["questions"]:
        existing = by_id.get(question["id"])
        if existing is None:
            questions.append(question)
            by_id[question["id"]] = question
        elif existing != question:
            raise RuntimeError(f"question ID already exists with different content: {question['id']}")

    questions.sort(key=lambda item: int(item["id"][1:]))
    expected_ids = [f"q{number}" for number in range(834, 934)]
    actual_ids = [question["id"] for question in questions]
    if actual_ids != expected_ids:
        raise RuntimeError(f"unexpected IDs: {actual_ids[:3]} ... {actual_ids[-3:]} ({len(actual_ids)})")

    answer_counts = {letter: 0 for letter in "abcde"}
    for question in questions:
        if set(question) != {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}:
            raise RuntimeError(f"unexpected keys in {question['id']}: {sorted(question)}")
        options = question["options"]
        if [option["id"] for option in options] != list("abcde"):
            raise RuntimeError(f"invalid options in {question['id']}")
        answer = question["correctOptionId"]
        if answer not in answer_counts:
            raise RuntimeError(f"invalid answer in {question['id']}")
        answer_counts[answer] += 1
        if "Fonte:" not in question["explanation"]:
            raise RuntimeError(f"missing provenance in {question['id']}")

    print("question count:", len(questions))
    print("answer counts:", answer_counts)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    bundle = load_bundle()
    if len(bundle["questions"]) != 50:
        raise RuntimeError("expected 50 new questions")
    patch_content(bundle)
    patch_cheat(bundle)
    patch_questions(bundle)


if __name__ == "__main__":
    main()
