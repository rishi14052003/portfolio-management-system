from dataclasses import dataclass, asdict, field
from datetime import datetime
import uuid


@dataclass
class Lead:
    id: str
    full_name: str
    phone: str
    email: str
    introduction: str
    pdf_filename: str
    created_at: str
    purpose: str = field(default='')
    company: str = field(default='')
    budget: str = field(default='')
    source: str = field(default='')

    @classmethod
    def create(
        cls,
        full_name: str,
        phone: str,
        email: str,
        introduction: str,
        pdf_filename: str,
        purpose: str = '',
        company: str = '',
        budget: str = '',
        source: str = '',
    ) -> 'Lead':
        return cls(
            id=str(uuid.uuid4()),
            full_name=full_name,
            phone=phone,
            email=email,
            introduction=introduction,
            pdf_filename=pdf_filename,
            created_at=datetime.utcnow().isoformat(),
            purpose=purpose,
            company=company,
            budget=budget,
            source=source,
        )

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> 'Lead':
        return cls(**data)
