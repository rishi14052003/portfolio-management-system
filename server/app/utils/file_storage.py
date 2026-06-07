import json
import os
from typing import TypeVar, Generic, Type, Callable

T = TypeVar('T')


class JsonFileStorage(Generic[T]):
    def __init__(self, filepath: str, from_dict: Callable[[dict], T], to_dict: Callable[[T], dict]):
        self.filepath = filepath
        self.from_dict = from_dict
        self.to_dict = to_dict
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        if not os.path.exists(filepath):
            self._write([])

    def _read(self) -> list[dict]:
        with open(self.filepath, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _write(self, data: list[dict]) -> None:
        with open(self.filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def get_all(self) -> list[T]:
        return [self.from_dict(item) for item in self._read()]

    def save(self, item: T) -> T:
        items = self._read()
        items.append(self.to_dict(item))
        self._write(items)
        return item

    def get_by_id(self, item_id: str) -> T | None:
        for item in self.get_all():
            if getattr(item, 'id') == item_id:
                return item
        return None

    def delete_by_id(self, item_id: str) -> bool:
        items = self._read()
        new_items = [i for i in items if i.get('id') != item_id]
        if len(new_items) == len(items):
            return False
        self._write(new_items)
        return True
