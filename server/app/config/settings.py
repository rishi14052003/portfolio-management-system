import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-dev-secret-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', '')

    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')

    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    PDF_DIR = os.path.join(BASE_DIR, 'app', 'generated_pdfs')
    DATA_DIR = os.path.join(BASE_DIR, 'app', 'data')
    LOGS_DIR = os.path.join(BASE_DIR, 'logs')

    LEADS_FILE = os.path.join(DATA_DIR, 'leads.json')
    ACTIVITY_FILE = os.path.join(DATA_DIR, 'activity.json')
