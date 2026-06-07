from app.routes.contact_routes import register_contact_routes
from app.routes.admin_routes import register_admin_routes
from app.routes.pdf_routes import pdf_bp

__all__ = ['register_contact_routes', 'register_admin_routes', 'pdf_bp']
