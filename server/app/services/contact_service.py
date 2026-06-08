import os
from app.config import Config
from app.models import Lead
from app.pdf import PDFGenerator
from app.email import EmailSender
from app.services.lead_service import LeadService


class ContactService:
    def __init__(self, email_sender: EmailSender):
        self.pdf_generator = PDFGenerator(Config.PDF_DIR)
        self.email_sender = email_sender
        self.lead_service = LeadService()

    def process_submission(self, full_name: str, phone: str, email: str, introduction: str, purpose: str, company: str, budget: str = None, source: str = None, pdf_filename: str = '') -> dict:
        temp_lead = Lead.create(full_name, phone, email, introduction, '', purpose, company, budget or '', source or '')
        lead_id = temp_lead.id

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

        lead = self.lead_service.create_lead(
            full_name, phone, email, introduction, pdf_filename_result, purpose, company, budget or '', source or ''
        )

        pdf_path = os.path.join(Config.PDF_DIR, pdf_filename_result)
        
        # Send confirmation email to user (non-blocking and error-safe)
        try:
            self.email_sender.send_contact_pdf(email, pdf_path, full_name, pdf_filename_result)
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"Failed to trigger user email send: {str(e)}")
        
        # Send admin notification (non-blocking and error-safe)
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
            import logging
            logging.getLogger(__name__).error(f"Failed to trigger admin email send: {str(e)}")

        return {
            'success': True,
            'message': 'Your submission has been received. A PDF has been sent to your email.',
            'lead_id': lead.id,
            'pdf_url': f'/api/pdfs/{pdf_filename_result}',
        }
