from flask import Blueprint
from app.controllers.admin_controller import AdminController


def register_admin_routes(admin_controller: AdminController) -> Blueprint:
    admin_bp = Blueprint('admin', __name__)

    @admin_bp.route('/admin/login', methods=['POST'])
    def login():
        return admin_controller.login()

    @admin_bp.route('/admin/profile', methods=['GET'])
    def profile():
        return admin_controller.profile()

    @admin_bp.route('/admin/leads', methods=['GET'])
    def get_leads():
        return admin_controller.get_leads()

    @admin_bp.route('/admin/lead/<lead_id>', methods=['GET'])
    def get_lead(lead_id: str):
        return admin_controller.get_lead(lead_id)

    @admin_bp.route('/admin/lead/<lead_id>', methods=['DELETE'])
    def delete_lead(lead_id: str):
        return admin_controller.delete_lead(lead_id)

    @admin_bp.route('/admin/stats', methods=['GET'])
    def get_stats():
        return admin_controller.get_stats()

    @admin_bp.route('/admin/export/csv', methods=['GET'])
    def export_csv():
        return admin_controller.export_csv()

    @admin_bp.route('/admin/export/excel', methods=['GET'])
    def export_excel():
        return admin_controller.export_excel()

    return admin_bp
