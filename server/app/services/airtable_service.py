import logging
import time
import requests
from app.config import Config

logger = logging.getLogger(__name__)

AIRTABLE_API_URL = 'https://api.airtable.com/v0'


class AirtableService:
    def __init__(self):
        self.token = Config.AIRTABLE_TOKEN
        self.base_id = Config.AIRTABLE_BASE_ID
        self.table = Config.AIRTABLE_LEADS_TABLE
        self.base_url = f'{AIRTABLE_API_URL}/{self.base_id}/{self.table}'
        self.headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json',
        }

    def _request(self, method: str, url: str, payload: dict = None, retries: int = 3, backoff: float = 1.0) -> dict:
        for attempt in range(1, retries + 1):
            try:
                response = requests.request(
                    method,
                    url,
                    headers=self.headers,
                    json=payload,
                    timeout=10,
                )
                if response.status_code in (200, 201):
                    return response.json()

                if response.status_code == 429:
                    wait = backoff * attempt
                    logger.warning(f'Airtable rate limited. Retrying in {wait}s (attempt {attempt}/{retries})')
                    time.sleep(wait)
                    continue

                logger.error(f'Airtable error {response.status_code}: {response.text}')
                response.raise_for_status()

            except requests.exceptions.Timeout:
                logger.warning(f'Airtable request timed out (attempt {attempt}/{retries})')
                if attempt < retries:
                    time.sleep(backoff * attempt)
            except requests.exceptions.ConnectionError as e:
                logger.error(f'Airtable connection error: {e}')
                if attempt < retries:
                    time.sleep(backoff * attempt)

        raise Exception(f'Airtable request failed after {retries} attempts: {method} {url}')

    def create_lead(
        self,
        full_name: str,
        email: str,
        phone: str,
        company: str,
        purpose: str,
        budget: str,
        source: str,
        introduction: str,
        pdf_filename: str,
        pdf_url: str,
    ) -> dict:
        fields = {
            'Full Name': full_name,
            'Email': email,
            'Phone': phone,
            'Company': company,
            'Introduction': introduction,
            'PDF Filename': pdf_filename,
            'PDF URL': pdf_url,
            'Email Sent': False,
        }

        # Single Select fields — only include if non-empty
        if purpose:
            fields['Purpose'] = purpose
        if budget:
            fields['Budget'] = budget
        if source:
            fields['Source'] = source

        payload = {'fields': fields}

        logger.info(f'Creating Airtable record for lead: {email}')
        result = self._request('POST', self.base_url, payload)
        record_id = result.get('id')
        logger.info(f'Airtable record created: {record_id}')
        return result

    def update_lead(self, record_id: str, fields: dict) -> dict:
        url = f'{self.base_url}/{record_id}'
        payload = {'fields': fields}
        logger.info(f'Updating Airtable record: {record_id}')
        return self._request('PATCH', url, payload)

    def mark_email_sent(self, record_id: str, sent: bool = True) -> dict:
        return self.update_lead(record_id, {'Email Sent': sent})