from flask import request, jsonify
from marshmallow import ValidationError
from app.schemas import contact_schema
from app.services.contact_service import ContactService


class ContactController:
    def __init__(self, contact_service: ContactService):
        self.contact_service = contact_service

    def submit(self):
        try:
            data = contact_schema.load(request.get_json())
        except ValidationError as err:
            return jsonify({'message': 'Validation failed', 'errors': err.messages}), 400

        try:
            result = self.contact_service.process_submission(
                full_name=data['full_name'],
                phone=data['phone'],
                email=data['email'],
                introduction=data['introduction'],
                purpose=data['purpose'],
                company=data['company'],
                budget=data.get('budget'),
                source=data.get('source'),
                pdf_filename=data.get('pdf_filename', ''),
            )
            return jsonify(result), 201
        except Exception as e:
            return jsonify({'message': f'Failed to process submission: {str(e)}'}), 500
