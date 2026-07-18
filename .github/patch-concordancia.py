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
    "conhecimentos-gerais/lingua-portuguesa/concordancia-verbal-nominal"
)
PARTS = [
    (Path(".github/concordancia-bundle.part1"), 5000, "9ad7eeba4f4e678ef6a00e2df1aba27b636ddcc4af0ab2f756bebc282586e90d"),
    (Path(".github/concordancia-bundle.part2"), 5000, "d2dcd5d3bcdba48300c48d7f84bb7f00a5da66aff927c4f9ccfd66e83fe716fc"),
    (Path(".github/concordancia-bundle.part3"), 5000, "2c5689f768b0a1191221167b26ca64ccf093881ff0e4558b1296d87b84a2fa49"),
    (Path(".github/concordancia-bundle.part4"), 1760, "22a9866414a576487d447ee6093162deccaf58ac00f3c42f5426519ca15ce951"),
]
EXPECTED_PAYLOAD_SHA = "27331515056f757ecb965820021f2a78a8d37b289d36299a096b938c7d21334f"
EXPECTED_COMPRESSED_SHA = "4d2b7d9268b6c36015bdb54163a0ebbd92eb62057109415eead0f0a7c44e12f8"
EXPECTED_RAW_SHA = "c9152a7fb4880870f71057f95f762efd5e68f2abf5c07d8f8b8e1eb723e85dc4"
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
    if len(payload) != 16760:
        raise RuntimeError(f"unexpected payload length: {len(payload)}")
    if hashlib.sha256(payload.encode("utf-8")).hexdigest() != EXPECTED_PAYLOAD_SHA:
        raise RuntimeError("payload checksum mismatch")

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
    if not isinstance(bundle["questions"], list) or len(bundle["questions"]) != 80:
        raise RuntimeError("the bundle must contain exactly 80 new questions")
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
        "description: Concordância verbal e nominal com núcleo, sujeito oracional, quantidades, impessoais, passivas, infinitivo, predicativos e reescritas de concurso.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-CONCORDANCIA-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_rule_general",
            "before_compound",
            "before_quantities",
            "before_pronouns",
            "before_impersonality",
            "before_se",
            "before_infinitive",
            "before_nominal",
            "before_recurring",
            "before_method",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Concordância verbal: regra geral", ins["before_rule_general"])
        text = insert_before(text, "## 3. Sujeito composto e relações de sentido", ins["before_compound"])
        text = insert_before(text, "## 4. Coletivos, partitivas e quantidades", ins["before_quantities"])
        text = insert_before(text, "## 5. Pronomes e expressões especiais", ins["before_pronouns"])
        text = insert_before(text, "## 6. Impessoalidade e o verbo *ser*", ins["before_impersonality"])
        text = insert_before(text, "## 7. Concordância em construções com *se*", ins["before_se"])
        text = insert_before(text, "## 8. Infinitivo pessoal e impessoal", ins["before_infinitive"])
        text = insert_before(text, "## 9. Concordância nominal: estrutura básica", ins["before_nominal"])
        text = insert_before(text, "## 10. Palavras e expressões recorrentes", ins["before_recurring"])
        text = insert_before(text, "## 14. Método para resolver questões", ins["before_method"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 4000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str, existing: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if "haver" in lowered or "há " in lowered:
        candidates.append("O verbo haver concorda sempre com o substantivo plural que o acompanha.")
    if "se" in lowered:
        candidates.append("A simples presença de “se” torna o verbo invariavelmente singular.")
    if "percent" in lowered or "%" in prompt:
        candidates.append("Percentuais exigem sempre verbo no singular, independentemente do especificador.")
    if "maioria" in lowered or "parte" in lowered:
        candidates.append("Expressões partitivas só admitem concordância com o nome plural interno.")
    if "infinit" in lowered or "revisar" in lowered:
        candidates.append("Todo infinitivo ligado a sujeito plural deve receber desinência de plural.")
    if "adjet" in lowered or "predic" in lowered or "particíp" in lowered:
        candidates.append("Adjetivos e particípios concordam obrigatoriamente com o substantivo mais próximo.")
    if "sujeito" in lowered or "núcleo" in lowered:
        candidates.append("O termo plural mais próximo do verbo controla a concordância por atração obrigatória.")
    if "possível" in lowered:
        candidates.append("A palavra “possível” permanece invariável em qualquer construção.")
    candidates.extend(
        [
            "A correção decorre apenas da proximidade linear entre as palavras.",
            "A flexão é facultativa em qualquer contexto, sem alteração de sentido.",
            "O verbo permanece no singular porque toda oração com termo preposicionado é impessoal.",
        ]
    )
    for candidate in candidates:
        if candidate not in existing:
            return candidate
    raise RuntimeError("could not create unique fifth distractor")


def move_correct_option(question: dict, target_id: str) -> None:
    options = question.get("options")
    if not isinstance(options, list) or [item.get("id") for item in options] not in [list("ABCD"), list("ABCDE")]:
        raise RuntimeError(f"invalid original options in {question.get('id')}")

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

    expected_ids = [f"q{number}" for number in range(3399, 3539)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q3399 to q3538")

    counts = {letter: 0 for letter in LETTERS}
    for question in questions:
        expected_keys = {"id", "revision", "prompt", "options", "correctOptionId", "explanation"}
        if set(question) != expected_keys:
            raise RuntimeError(f"unexpected keys in {question.get('id')}: {sorted(question)}")
        options = question["options"]
        if [option.get("id") for option in options] != LETTERS:
            raise RuntimeError(f"invalid options in {question['id']}")
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
    if counts != {letter: 28 for letter in LETTERS}:
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

    original_ids = [f"q{number}" for number in range(3399, 3459)]
    final_ids = [f"q{number}" for number in range(3399, 3539)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(3459, 3539)]:
            raise RuntimeError("new question IDs must be q3459 through q3538")
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
