from __future__ import annotations

import base64
import bz2
import json
from pathlib import Path

parts = [Path(f'.github/patrimonio-mobiliario-bundle.part{i}') for i in range(1, 6)]
payload = ''.join(''.join(path.read_text(encoding='utf-8').split()) for path in parts)
bundle = json.loads(bz2.decompress(base64.b64decode(payload, validate=True)).decode('utf-8'))

report = {
    'keys': sorted(bundle),
    'insertions': {
        key: {
            'length': len(value),
            'preview': value[:240],
        }
        for key, value in bundle.get('insertions', {}).items()
    },
    'cheat_length': len(bundle.get('cheat', '')),
    'question_count': len(bundle.get('questions', [])),
    'first_question_id': bundle.get('questions', [{}])[0].get('id'),
    'last_question_id': bundle.get('questions', [{}])[-1].get('id'),
}
Path('.github/patrimonio-mobiliario-diagnostic.json').write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + '\n',
    encoding='utf-8',
)
print(json.dumps(report, ensure_ascii=False, indent=2))
