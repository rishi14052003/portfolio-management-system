import os
from flask import Blueprint, send_file, jsonify
from app.config import Config

pdf_bp = Blueprint('pdf', __name__)


@pdf_bp.route('/pdfs/<filename>', methods=['GET'])
def serve_pdf(filename: str):
    if '..' in filename or '/' in filename or '\\' in filename:
        return jsonify({'message': 'Invalid filename'}), 400

    filepath = os.path.join(Config.PDF_DIR, filename)
    if not os.path.exists(filepath):
        return jsonify({'message': 'PDF not found'}), 404

    return send_file(
        filepath,
        mimetype='application/pdf',
        as_attachment=False,
        download_name=filename,
    )
