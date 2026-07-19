from __future__ import annotations

import hashlib
from pathlib import Path

MINI_HASHES = [
    "390b6a4b039bd52ddd261afd4131819e039905f2b2c62bbf6024b839af997bf9",
    "9238ca8ddd57a3d6bfddddeebff5116182365cfd6347da88aece8bb302c9ab42",
    "c3262cb0b90b0066f21ffe6d95545ff47a2469653e8d21bbecd38b374dc88eb3",
    "0650adace5104113505a4782771ec1e035d405ff570dc78c5394c24722076750",
    "77b9b1faf3fa1013a44e148d663fbb7c04dddfe59ba725a951a9417ce27dddfa",
    "d1dbbb851055573d53baecb75722620b6efffd0ab0a7e7dccb4cf7e13caec3c2",
]
TAIL_HASHES = [
    "7e98522196f383c03892a95725fd8baebf582d1964f45830a7c2084d324d227e",
    "5bcca16c4c0113ce62e265e8c59feda321e62eebf51eba8fab0bf5715bfc2054",
    "73985f480b2ad6ed1278424cd9a16808301954f1da9b2ddeba1058fbfd8d1643",
    "05f537b67c670078e1535e062fc7781897dafabc95fbacad273f87bae375cda0",
    "9aa6e2be6dcb5ed71cabc05a92c1cc6804be256819a71a17d764e430842018b0",
    "cc8482f952b7e2e08c0e5b3e9a442292ec2486353bec89fae7bab4cd25701c08",
    "8cbaf956d24517dd4c4bbc9ccfee95af0ba8946e081611a5041d0c8f1bcac977",
    "636ced942dfa03d4336d607a0c1ad1c6610c02ee8da405c1d132f360d34497ad",
    "83486de150c4ca782bd4d7a3eebd0397ac4f7bfae0c027d505a75cbe61d77cb3",
    "47f53d9ae94c7a51804f821d9511678460abb08b15e79aea8f352e8f271fa88a",
    "33b803b552ea629c13e813395830f242c426ff7d96ca66393419894c6766ec78",
]
EXPECTED_PAYLOAD_SHA = "229ec543e7158251ed0bf5b557a89304cab62c5b4d6ba47500a57bdf88d25815"
LONG_LENGTHS = [6000, 6000, 6000, 6000, 2852]
LONG_HASHES = [
    "de2146983f3eaaba9abc3f1bc6d892730cff1005bb27f56b9e5380aea1116edc",
    "9c202eaf85e26ee6c23367bbdd5a76f584c20e4c82f65f8f3eee3c68e52fe694",
    "6a1db52327d7b513fe65cc5755db00c7c02d3272ccf686f10af5d2ec4f6ba784",
    "8b7817d8f62cbc76d8b833c6cbf4e6e9712eb6801578396ed8f5bd5c7710fe28",
    "3dabf68fb32d972c1953f13777c7fa46545ef838c2acc169e5c78bec0fec5a15",
]


def read_segment(path: Path, expected_length: int, expected_hash: str) -> str:
    segment = "".join(path.read_text(encoding="utf-8").split())
    digest = hashlib.sha256(segment.encode("utf-8")).hexdigest()
    print(path, "chars=", len(segment), "sha256=", digest)
    if len(segment) != expected_length:
        raise RuntimeError(f"length mismatch for {path}: {len(segment)}")
    if digest != expected_hash:
        raise RuntimeError(f"hash mismatch for {path}: {digest}")
    return segment


def main() -> None:
    segments: list[str] = []
    for index, expected_hash in enumerate(MINI_HASHES):
        segments.append(
            read_segment(
                Path(f".github/gestao-execucao-mini.part{index:02d}"),
                1000,
                expected_hash,
            )
        )
    for index, expected_hash in enumerate(TAIL_HASHES):
        expected_length = 852 if index == 10 else 2000
        segments.append(
            read_segment(
                Path(f".github/gestao-execucao-tail.part{index:02d}"),
                expected_length,
                expected_hash,
            )
        )

    payload = "".join(segments)
    payload_hash = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    print("payload chars=", len(payload), "sha256=", payload_hash)
    if len(payload) != 26852 or payload_hash != EXPECTED_PAYLOAD_SHA:
        raise RuntimeError("rebuilt payload does not match the intended editorial bundle")

    offset = 0
    for index, (length, expected_hash) in enumerate(zip(LONG_LENGTHS, LONG_HASHES), start=1):
        chunk = payload[offset : offset + length]
        offset += length
        digest = hashlib.sha256(chunk.encode("utf-8")).hexdigest()
        if len(chunk) != length or digest != expected_hash:
            raise RuntimeError(f"rebuilt long part {index} failed validation")
        Path(f".github/gestao-execucao-bundle.part{index}").write_text(chunk, encoding="utf-8")
        print(f"rebuilt part {index}: chars=", length, "sha256=", digest)

    if offset != len(payload):
        raise RuntimeError("not all payload bytes were consumed")


if __name__ == "__main__":
    main()
