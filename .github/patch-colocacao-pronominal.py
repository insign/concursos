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
    "conhecimentos-gerais/lingua-portuguesa/colocacao-pronominal"
)
PARTS = [
    (Path(".github/colocacao-bundle.part1"), 5000, "2db237e9bb01a6503f0dc0bcb0b0f89ebef58abdde49d0d251c96e9561aea229"),
    (Path(".github/colocacao-bundle.part2"), 5000, "d49ad974d5166e6e19a500d756a0a01adf2ec723518acbf9d87a9ff15aa003b9"),
    (Path(".github/colocacao-bundle.part3"), 5000, "80c82ccc9bc8b965c32c70a57c56e10bf6413901ba0f0d08da63a7d0edc7ce47"),
    (Path(".github/colocacao-bundle.part4"), 3364, "eaa588d07352acd3494653bdec33679fd75c6320f234c48b3f1c4fb774166e04"),
]
EXPECTED_PAYLOAD_SHA = "bd66defe516056764b5b7c9c1d2ee862bf6c178b2d5e02c0855d4e30ca7e505f"
EXPECTED_COMPRESSED_SHA = "796908450d72f987fa2af49078ad0fea093a8647432d699a2895a19f20d1de9f"
EXPECTED_RAW_SHA = "5c3623f5e20932dffb972eb644035370e000c310b889da35fd5c3b0316123b2c"
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
    if len(payload) != 18364:
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
        "description: Colocação dos pronomes átonos com atratores, locuções, cadeias verbais, funções de se, regência, grafia e reescritas de concurso.",
        text,
        count=1,
        flags=re.MULTILINE,
    )

    if "<!-- REVISAO-COLOCACAO-2026 -->" not in text:
        ins = bundle["insertions"]
        required = {
            "before_pronouns",
            "before_proclise",
            "before_enclise",
            "before_mesoclise",
            "before_graphics",
            "before_forms",
            "before_locutions",
            "before_variation",
            "before_combinations",
            "before_rewrite",
            "before_errors",
            "before_method",
            "references",
        }
        if set(ins) != required:
            raise RuntimeError(f"unexpected insertion keys: {sorted(ins)}")

        text = insert_before(text, "## 2. Quais são os pronomes átonos", ins["before_pronouns"])
        text = insert_before(text, "## 4. Próclise: fatores de atração", ins["before_proclise"])
        text = insert_before(text, "## 5. Ênclise: posição posterior ao verbo", ins["before_enclise"])
        text = insert_before(text, "## 6. Mesóclise: futuro simples sem atrator", ins["before_mesoclise"])
        text = insert_before(text, "## 7. Alterações gráficas com `o, a, os, as`", ins["before_graphics"])
        text = insert_before(text, "## 8. Infinitivo, gerúndio e particípio", ins["before_forms"])
        text = insert_before(text, "## 9. Colocação nas locuções verbais", ins["before_locutions"])
        text = insert_before(text, "## 10. Sujeito expresso, pausa e zonas de variação", ins["before_variation"])
        text = insert_before(text, "## 11. Combinações pronominais", ins["before_combinations"])
        text = insert_before(text, "## 12. Reescrita: o que precisa ser preservado", ins["before_rewrite"])
        text = insert_before(text, "## 13. Erros frequentes", ins["before_errors"])
        text = insert_before(text, "## 14. Método de prova", ins["before_method"])
        text = insert_before(text, "## Referências", ins["references"])

    path.write_text(text, encoding="utf-8")


def patch_cheat(bundle: dict) -> None:
    cheat = bundle["cheat"]
    if not isinstance(cheat, str) or len(cheat) < 5000:
        raise RuntimeError("invalid cheat sheet in bundle")
    (ROOT / "cheat-sheet.md").write_text(cheat.rstrip() + "\n", encoding="utf-8")


def fifth_distractor(prompt: str, existing: set[str]) -> str:
    lowered = prompt.casefold()
    candidates: list[str] = []
    if "locução" in lowered or "auxiliar" in lowered:
        candidates.append("O pronome deve ficar obrigatoriamente depois do particípio, qualquer que seja a cadeia verbal.")
    if "mesóclise" in lowered or "futuro" in lowered:
        candidates.append("A mesóclise é possível em qualquer tempo verbal e em qualquer forma nominal.")
    if "se" in lowered:
        candidates.append("A simples presença de “se” torna o verbo impessoal e invariável no singular.")
    if "lhe" in lowered or "objeto" in lowered or "regência" in lowered:
        candidates.append("O pronome “lhe” pode substituir qualquer complemento humano sem alteração sintática.")
    if "advérbio" in lowered or "vírgula" in lowered or "pausa" in lowered:
        candidates.append("Toda palavra anterior ao verbo atrai o pronome, mesmo quando pertence a outra oração.")
    if "particípio" in lowered:
        candidates.append("O particípio admite ênclise sempre que não houver palavra negativa.")
    candidates.extend(
        [
            "A posição depende apenas da distância gráfica entre o pronome e o verbo.",
            "Toda próclise inicial é obrigatória em qualquer registro formal.",
            "A existência de hífen basta para garantir função, regência e sentido corretos.",
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

    expected_ids = [f"q{number}" for number in range(3579, 3719)]
    actual_ids = [item.get("id") for item in questions]
    if actual_ids != expected_ids:
        raise RuntimeError("question IDs must be unique and sequential from q3579 to q3718")

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

    original_ids = [f"q{number}" for number in range(3579, 3639)]
    final_ids = [f"q{number}" for number in range(3579, 3719)]
    current_ids = [item.get("id") for item in questions]

    if current_ids == original_ids:
        for index, question in enumerate(questions):
            move_correct_option(question, LETTERS[index % 5])
        additions = copy.deepcopy(bundle["questions"])
        if [item.get("id") for item in additions] != [f"q{number}" for number in range(3639, 3719)]:
            raise RuntimeError("new question IDs must be q3639 through q3718")
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
