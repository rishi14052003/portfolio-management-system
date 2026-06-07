from flask import request, jsonify, send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app.schemas import login_schema
from app.services.auth_service import AuthService
from app.services.lead_service import LeadService
from app.utils.export import export_leads_to_csv, export_leads_to_excel, generate_csv_filename, generate_excel_filename
import io


class AdminController:
    def __init__(self, lead_service: LeadService):
        self.lead_service = lead_service
        self.auth_service = AuthService()

    def login(self):
        try:
            data = login_schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'message': 'Validation failed', 'errors': err.messages}), 400

        if not self.auth_service.authenticate(data['username'], data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401

        access_token = create_access_token(identity=data['username'])
        return jsonify({
            'access_token': access_token,
            'message': 'Login successful',
        }), 200

    @jwt_required()
    def profile(self):
        username = get_jwt_identity()
        return jsonify(self.auth_service.get_profile(username)), 200

    @jwt_required()
    def get_leads(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '', type=str)
        date_from = request.args.get('date_from', '', type=str)
        date_to = request.args.get('date_to', '', type=str)

        result = self.lead_service.get_paginated_leads(
            page=page,
            per_page=per_page,
            search=search,
            date_from=date_from,
            date_to=date_to,
        )
        return jsonify(result), 200

    @jwt_required()
    def get_lead(self, lead_id: str):
        lead = self.lead_service.get_lead_by_id(lead_id)
        if not lead:
            return jsonify({'message': 'Lead not found'}), 404
        return jsonify(lead.to_dict()), 200

    @jwt_required()
    def delete_lead(self, lead_id: str):
        if not self.lead_service.delete_lead(lead_id):
            return jsonify({'message': 'Lead not found'}), 404
        return jsonify({'message': 'Lead deleted successfully'}), 200

    @jwt_required()
    def get_stats(self):
        stats = self.lead_service.get_stats()
        return jsonify(stats), 200

    @jwt_required()
    def export_csv(self):
        """Export all leads as CSV"""
        try:
            leads = self.lead_service.get_all_leads()
            csv_data = export_leads_to_csv(leads)
            
            if not csv_data:
                return jsonify({'message': 'No leads to export'}), 404
            
            return send_file(
                io.BytesIO(csv_data.encode()),
                mimetype='text/csv',
                as_attachment=True,
                download_name=generate_csv_filename(),
            )
        except Exception as e:
            return jsonify({'message': f'Failed to export CSV: {str(e)}'}), 500

    @jwt_required()
    def export_excel(self):
        """Export all leads as Excel (.xlsx)"""
        try:
            leads = self.lead_service.get_all_leads()
            
            if not leads:
                return jsonify({'message': 'No leads to export'}), 404
            
            excel_data = export_leads_to_excel(leads)
            
            return send_file(
                io.BytesIO(excel_data),
                mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                as_attachment=True,
                download_name=generate_excel_filename(),
            )
        except ImportError:
            return jsonify({
                'message': 'Excel export requires openpyxl. Please install it: pip install openpyxl'
            }), 501
        except Exception as e:
            return jsonify({'message': f'Failed to export Excel: {str(e)}'}), 500
