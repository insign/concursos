from __future__ import annotations

import importlib.util
import json
from pathlib import Path

SCRIPT = Path('.github/patch-gestao-contratual.py')
spec = importlib.util.spec_from_file_location('patch_gestao_contratual', SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError('cannot load the base materializer')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def collect_other_ids(target_path: Path) -> set[str]:
    """Collect occupied IDs without failing on historical duplicates elsewhere."""
    ids: set[str] = set()
    for path in Path('src/content/assuntos').rglob('questoes.json'):
        if path.resolve() == target_path.resolve():
            continue
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
        except Exception as exc:
            raise RuntimeError(f'cannot parse {path}: {exc}') from exc
        for question in data.get('questions', []):
            qid = question.get('id')
            if isinstance(qid, str):
                ids.add(qid)
    return ids


module.collect_other_ids = collect_other_ids
module.main()
