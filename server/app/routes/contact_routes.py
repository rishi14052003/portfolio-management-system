from flask import Blueprint
from app.controllers.contact_controller import ContactController


def register_contact_routes(contact_controller: ContactController) -> Blueprint:
    contact_bp = Blueprint('contact', __name__)

    @contact_bp.route('/contact', methods=['POST'])
    def submit_contact():
        return contact_controller.submit()

    return contact_bp
