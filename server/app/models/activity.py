from dataclasses import dataclass, asdict
from datetime import datetime
import uuid


@dataclass
class Activity:
    id: str
    action: str
    description: str
    timestamp: str

    @classmethod
    def create(cls, action: str, description: str) -> 'Activity':
        return cls(
            id=str(uuid.uuid4()),
            action=action,
            description=description,
            timestamp=datetime.utcnow().isoformat(),
        )

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> 'Activity':
        return cls(**data)
