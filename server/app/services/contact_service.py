import logging
import os
from app.config import Config
from app.models import Lead
from app.pdf import PDFGenerator
from app.email import EmailSender
from app.services.lead_service import LeadService
from app.services.airtable_service import AirtableService

logger = logging.getLogger(__name__)


class ContactService:
    def __init__(self, email_sender: EmailSender):
        self.pdf_generator = PDFGenerator(Config.PDF_DIR)
        self.email_sender = email_sender
        self.lead_service = LeadService()
        self.airtable = AirtableService()

    def process_submission(
        self,
        full_name: str,
        phone: str,
        email: str,
        introduction: str,
        purpose: str,
        company: str,
        budget: str = None,
        source: str = None,
        pdf_filename: str = '',
    ) -> dict:

        # Step 1: Generate PDF
        pdf_filename_result = self.pdf_generator.generate(
            full_name=full_name,
            phone=phone,
            email=email,
            introduction=introduction,
            purpose=purpose,
            company=company,
            budget=budget or '',
            source=source or '',
            pdf_filename=pdf_filename,
        )

        # Step 2: Build PDF URL
        pdf_url = f'{Config.PDF_PUBLIC_BASE_URL}/api/pdfs/{pdf_filename_result}' if hasattr(Config, 'PDF_PUBLIC_BASE_URL') and Config.PDF_PUBLIC_BASE_URL else ''

        # Step 3: Save to Airtable
        airtable_record_id = None
        try:
            result = self.airtable.create_lead(
                full_name=full_name,
                email=email,
                phone=phone,
                company=company,
                purpose=purpose,
                budget=budget or '',
                source=source or '',
                introduction=introduction,
                pdf_filename=pdf_filename_result,
                pdf_url=pdf_url,
            )
            airtable_record_id = result.get('id')
        except Exception as e:
            logger.error(f'Failed to create Airtable record: {e}')

        # Step 4: Save locally (keep existing behaviour as fallback)
        lead = self.lead_service.create_lead(
            full_name, phone, email, introduction, pdf_filename_result, purpose, company, budget or '', source or ''
        )

        # Step 5: Send user confirmation email
        pdf_path = os.path.join(Config.PDF_DIR, pdf_filename_result)
        try:
            self.email_sender.send_contact_pdf(email, pdf_path, full_name, pdf_filename_result)
        except Exception as e:
            logger.error(f'Failed to send user email: {e}')

        # Step 6: Send admin notification email
        try:
            self.email_sender.send_admin_notification(
                full_name=full_name,
                email=email,
                phone=phone,
                purpose=purpose,
                company=company,
                source=source or 'Not specified',
                introduction=introduction,
            )
        except Exception as e:
            logger.error(f'Failed to send admin email: {e}')

        return {
            'success': True,
            'message': 'Your submission has been received. A PDF has been sent to your email.',
            'lead_id': lead.id,
            'pdf_url': f'/api/pdfs/{pdf_filename_result}',
            'airtable_record_id': airtable_record_id,
        }