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
    "conhecimentos-gerais/lingua-portuguesa/significacao-substituicao-lexical"
)
PARTS = [
    (Path(".github/significacao-bundle.part1"), 5000, "1c332811d8bf9e825e04882e517ffa3aba65ac93408bcaabd95e77690808fc27"),
    (Path(".github/significacao-bundle.part2"), 5000, "0202df3adc7ce3d97918b9c6b90fc101a02db5e7939744b6e51d2d2b007489dc"),
    (Path(".github/significacao-bundle.part3"), 5000, "cff647ecc3a9ffa7e7f585d30f6b7ee2655595ca067686c1fa75c2a50d4df9be"),
    (Path(".github/significacao-bundle.part4"), 5000, "c39cec20cf92f2231079099c2125eadfa20109228dfb4800bc9c6bc2a1d44c4e"),
    (Path(".github/significacao-bundle.part5"), 4416, "6b6398043026f08172f2071e73ddb0412944e4b7e5bcad841d51dc0bbd80269a"),
]
EXPECTED_PAYLOAD_SHA = "c1792a2fcc0a526f4cf5dcfcdc6857fb186648af1fc604739321e4b6924826c8"
EXPECTED_COMPRESSED_SHA = "23165816f1ba54a93dea37b1c29dbe70c88b5e0968c4bc550eca01a4f5ed589d"
EXPECTED_RAW_SHA = "0e87f1c54ead16fe5d7424f75b9fa234588456a018dd6d2c609a80e15ae08269"
LETTERS = list("ABCDE")


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
    if len(payload) != 24416:
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
        "description: Sentido contextual, relações lexicais, inferência, operadores e critérios para substituir palavras ou trechos sem perder gramática, referência ou efeito.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-SIGNIFICACAO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_equivalence",
            "before_gate",
            "before_modality",
            "before_operators",
            "before_reference",
            "before_register",
            "before_dictionary",
            "before_method",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 5. Três níveis de equivalência", ins["before_equivalence"])
        text = insert_before(text, "## 6. O gate gramatical da substituição", ins["before_gate"])
        text = insert_before(text, "## 8. Modalidade, tempo e aspecto", ins["before_modality"])
        text = insert_before(text, "## 9. Operadores, quantificadores e escopo", ins["before_operators"])
        text = insert_before(text, "## 12. Referência, repetição e substituição lexical", ins["before_reference"])
        text = insert_before(text, "## 13. Registro, tecnicidade e alcance", ins["before_register"])
        text = insert_before(text, "## 14. Como usar dicionários e vocabulários", ins["before_dictionary"])
        text = insert_before(text, "## 15. Método para itens de substituição", ins["before_method"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 7000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str, existing: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if "sinon" in lowered or "substitu" in lowered:
        candidates.append("A troca é válida sempre que as palavras aparecem juntas em um dicionário de sinônimos.")
    if "conector" in lowered or "porque" in lowered or "portanto" in lowered:
        candidates.append("Conectores podem ser trocados livremente porque não alteram a relação lógica.")
    if "modal" in lowered or "pode" in lowered or "deve" in lowered:
        candidates.append("Auxiliares modais alteram apenas o tempo, sem afetar o compromisso do enunciador.")
    if "quant" in lowered or "todos" in lowered or "nenhum" in lowered:
        candidates.append("Quantificadores diferentes preservam necessariamente as mesmas condições de verdade.")
    if "pronome" in lowered or "refer" in lowered:
        candidates.append("A substituição pronominal elimina automaticamente qualquer ambiguidade de referente.")
    if "regência" in lowered or "preposição" in lowered:
        candidates.append("A preposição do verbo original deve ser mantida, mesmo que o verbo substituto tenha outra regência.")
    candidates.extend(
        [
            "A correção depende apenas de a nova forma ter a mesma classe gramatical.",
            "Uma frase mais curta preserva obrigatoriamente toda a informação do original.",
            "A primeira acepção do dicionário determina o sentido em qualquer contexto.",
        ]
    )
    for candidate in candidates:
        if candidate not in existing:
            return candidate
    raise RuntimeError("could not create unique fifth distractor")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    ids = [item.get("id") for item in options] if isinstance(options, list) else []
    if ids not in [list("ABCD"), list("ABCDE")]:
        raise RuntimeError(f"invalid original options in {question.get('id')}: {ids}")

    options = copy.deepcopy(options)
    if len(options) == 4:
        existing = {item.get("text", "") for item in options}
        options.append({"id": "E", "text": fifth_distractor(question.get("prompt", ""), existing)})

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

    expected_ids = [f"q{number}" for number in range(3639, 3799)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q3639 to q3798")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid option IDs in {question['id']}")
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
    if counts != {letter: 32 for letter in LETTERS}:
        raise RuntimeError(f"unbalanced answer key: {counts}")

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

    original_ids = [f"q{number}" for number in range(3639, 3699)]
    final_ids = [f"q{number}" for number in range(3639, 3799)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(3699, 3799)]:
            raise RuntimeError("new question IDs must be q3699 through q3798")
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
