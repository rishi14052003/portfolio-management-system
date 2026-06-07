import logging
import os
from flask_mail import Message, Mail
from app.email.templates import get_user_confirmation_template, get_admin_notification_template

logger = logging.getLogger(__name__)


class EmailSender:
    def __init__(self, mail: Mail):
        self.mail = mail
        self.admin_email = os.getenv('MAIL_ADMIN_EMAIL') or os.getenv('MAIL_DEFAULT_SENDER')

    def send_contact_pdf(self, recipient: str, pdf_path: str, full_name: str, pdf_filename: str = '') -> bool:
        """Send confirmation email to user with PDF attachment"""
        try:
            # Get just the filename from the path
            filename = pdf_filename or pdf_path.split('/')[-1].split('\\')[-1]
            
            html_body = get_user_confirmation_template(full_name, filename)
            
            msg = Message(
                subject='✓ Thank You for Your Submission - Rishabh Jain',
                recipients=[recipient],
                html=html_body,
            )

            with open(pdf_path, 'rb') as f:
                msg.attach(
                    filename=filename,
                    content_type='application/pdf',
                    data=f.read(),
                )

            self.mail.send(msg)
            logger.info('Confirmation email sent successfully to %s', recipient)
            return True
        except Exception as e:
            logger.error('Failed to send confirmation email to %s: %s', recipient, str(e))
            return False

    def send_admin_notification(
        self,
        full_name: str,
        email: str,
        phone: str,
        purpose: str,
        company: str,
        source: str,
        introduction: str,
    ) -> bool:
        """Send notification email to admin about new lead"""
        try:
            if not self.admin_email:
                logger.warning('Admin email not configured')
                return False

            html_body = get_admin_notification_template(
                full_name=full_name,
                email=email,
                phone=phone,
                purpose=purpose,
                company=company,
                source=source,
                introduction=introduction,
            )

            msg = Message(
                subject=f'🔔 New Lead: {full_name} ({purpose})',
                recipients=[self.admin_email],
                html=html_body,
            )

            self.mail.send(msg)
            logger.info('Admin notification sent for new lead from %s', full_name)
            return True
        except Exception as e:
            logger.error('Failed to send admin notification: %s', str(e))
            return False
