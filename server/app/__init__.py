import os
import logging
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from app.config import Config
from app.middlewares import register_error_handlers
from app.services.lead_service import LeadService
from app.services.contact_service import ContactService
from app.services.auth_service import AuthService
from app.email import EmailSender
from app.controllers.contact_controller import ContactController
from app.controllers.admin_controller import AdminController
from app.routes.contact_routes import register_contact_routes
from app.routes.admin_routes import register_admin_routes
from app.routes.pdf_routes import pdf_bp


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    os.makedirs(Config.PDF_DIR, exist_ok=True)
    os.makedirs(Config.DATA_DIR, exist_ok=True)
    os.makedirs(Config.LOGS_DIR, exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(os.path.join(Config.LOGS_DIR, 'app.log')),
            logging.StreamHandler(),
        ],
    )

    CORS(app, origins=Config.CORS_ORIGINS, supports_credentials=True)

    JWTManager(app)
    mail = Mail(app)
    email_sender = EmailSender(mail)

    lead_service = LeadService()
    contact_service = ContactService(email_sender)
    contact_controller = ContactController(contact_service)
    admin_controller = AdminController(lead_service)

    app.register_blueprint(register_contact_routes(contact_controller), url_prefix='/api')
    app.register_blueprint(register_admin_routes(admin_controller), url_prefix='/api')
    app.register_blueprint(pdf_bp, url_prefix='/api')

    register_error_handlers(app)

    @app.route('/api/health')
    def health():
        return {'status': 'healthy', 'message': 'Portfolio API is running'}

    return app
