import os
from datetime import datetime
from app.config import Config
from app.models import Lead, Activity
from app.utils.file_storage import JsonFileStorage


class LeadService:
    def __init__(self):
        self.lead_storage = JsonFileStorage(
            Config.LEADS_FILE,
            Lead.from_dict,
            Lead.to_dict,
        )
        self.activity_storage = JsonFileStorage(
            Config.ACTIVITY_FILE,
            Activity.from_dict,
            Activity.to_dict,
        )

    def create_lead(
        self,
        full_name: str,
        phone: str,
        email: str,
        introduction: str,
        pdf_filename: str,
        purpose: str = '',
        company: str = '',
        budget: str = '',
        source: str = '',
    ) -> Lead:
        lead = Lead.create(full_name, phone, email, introduction, pdf_filename, purpose, company, budget, source)
        self.lead_storage.save(lead)
        self._log_activity('New Lead', f'{full_name} submitted contact form')
        return lead

    def get_all_leads(self) -> list[Lead]:
        return sorted(
            self.lead_storage.get_all(),
            key=lambda x: x.created_at,
            reverse=True,
        )

    def get_lead_by_id(self, lead_id: str) -> Lead | None:
        return self.lead_storage.get_by_id(lead_id)

    def delete_lead(self, lead_id: str) -> bool:
        lead = self.get_lead_by_id(lead_id)
        if not lead:
            return False

        if lead.pdf_filename:
            pdf_path = os.path.join(Config.PDF_DIR, lead.pdf_filename)
            if os.path.exists(pdf_path):
                os.remove(pdf_path)

        deleted = self.lead_storage.delete_by_id(lead_id)
        if deleted:
            self._log_activity('Lead Deleted', f'Lead {lead.full_name} was deleted')
        return deleted

    def get_paginated_leads(
        self,
        page: int = 1,
        per_page: int = 10,
        search: str = '',
        date_from: str = '',
        date_to: str = '',
    ) -> dict:
        leads = self.get_all_leads()

        if search:
            search_lower = search.lower()
            leads = [
                l for l in leads
                if search_lower in l.full_name.lower()
                or search_lower in l.email.lower()
                or search_lower in l.phone.lower()
            ]

        if date_from:
            leads = [l for l in leads if l.created_at[:10] >= date_from]

        if date_to:
            leads = [l for l in leads if l.created_at[:10] <= date_to]

        total = len(leads)
        total_pages = max(1, (total + per_page - 1) // per_page)
        start = (page - 1) * per_page
        end = start + per_page

        return {
            'leads': [l.to_dict() for l in leads[start:end]],
            'total': total,
            'page': page,
            'per_page': per_page,
            'total_pages': total_pages,
        }

    def get_stats(self) -> dict:
        leads = self.get_all_leads()
        activities = sorted(
            self.activity_storage.get_all(),
            key=lambda x: x.timestamp,
            reverse=True,
        )[:10]

        # Calculate daily trend for the last 7 days (including today)
        from datetime import timedelta
        today = datetime.utcnow().date()
        daily_trend = []
        for i in range(6, -1, -1):
            d = today - timedelta(days=i)
            d_str = d.strftime('%Y-%m-%d')
            count = sum(1 for l in leads if l.created_at.startswith(d_str))
            daily_trend.append({
                'date': d.strftime('%b %d'),
                'count': count
            })

        # Calculate breakdown by purpose
        purpose_counts = {}
        for l in leads:
            p = l.purpose or 'Just Saying Hi'
            purpose_counts[p] = purpose_counts.get(p, 0) + 1

        # Calculate breakdown by source
        source_counts = {}
        for l in leads:
            s = l.source or 'Other'
            source_counts[s] = source_counts.get(s, 0) + 1

        # Calculate breakdown by budget (only for Freelance Project)
        budget_counts = {}
        for l in leads:
            if l.purpose == 'Freelance Project' and l.budget:
                budget_counts[l.budget] = budget_counts.get(l.budget, 0) + 1

        return {
            'total_leads': len(leads),
            'pdfs_generated': len([l for l in leads if l.pdf_filename]),
            'recent_leads': [l.to_dict() for l in leads[:5]],
            'latest_activity': [a.to_dict() for a in activities],
            'leads_by_purpose': purpose_counts,
            'leads_by_source': source_counts,
            'leads_by_budget': budget_counts,
            'daily_trend': daily_trend,
        }

    def _log_activity(self, action: str, description: str) -> None:
        activity = Activity.create(action, description)
        self.activity_storage.save(activity)
