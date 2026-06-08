import os
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import Flowable


# ── Purpose badge colours ────────────────────────────────────────────────────
PURPOSE_COLORS = {
    'Job Opportunity':   ('#1d4ed8', '#dbeafe'),   # blue
    'Freelance Project': ('#b45309', '#fef3c7'),   # amber
    'Collaboration':     ('#065f46', '#d1fae5'),   # green
    'Just Saying Hi':    ('#6b21a8', '#f3e8ff'),   # purple
}

SOURCE_LABELS = {
    'LinkedIn':      'LinkedIn',
    'GitHub':        'GitHub',
    'Google Search': 'Google Search',
    'Referral':      'Referral',
    'Other':         'Other',
}


class Divider(Flowable):
    def __init__(self, width, thickness=1, color=None):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.color = color or colors.HexColor('#cbd5e1')

    def wrap(self, availWidth, availHeight):
        return self.width, self.thickness

    def draw(self):
        self.canv.saveState()
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 0, self.width, 0)
        self.canv.restoreState()


class PDFGenerator:
    def __init__(self, output_dir: str):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

        # Brand palette - Slate & Steel Blue
        self.primary    = colors.HexColor('#0f172a')  # Slate 900
        self.primary_dk = colors.HexColor('#1e293b')  # Slate 800
        self.accent     = colors.HexColor('#2563eb')  # Blue 600
        self.accent_lt  = colors.HexColor('#64748b')  # Slate 500
        self.surface    = colors.HexColor('#f8fafc')  # Slate 50
        self.text_dark  = colors.HexColor('#0f172a')  # Slate 900
        self.text_body  = colors.HexColor('#334155')  # Slate 700
        self.text_muted = colors.HexColor('#64748b')  # Slate 500
        self.white      = colors.HexColor('#ffffff')
        self.divider    = colors.HexColor('#cbd5e1')  # Slate 300

    # ── Helpers ─────────────────────────────────────────────────────────────

    def generate_filename(self, custom_name: str = '') -> str:
        if custom_name and isinstance(custom_name, str):
            return f'{custom_name.strip()}.pdf'
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return f'submission_{timestamp}.pdf'

    def _styles(self):
        base = getSampleStyleSheet()
        return {
            'doc_title': ParagraphStyle(
                'DocTitle', parent=base['Normal'],
                fontSize=20, fontName='Helvetica-Bold',
                leading=24, textColor=self.text_dark,
            ),
            'doc_subtitle': ParagraphStyle(
                'DocSubtitle', parent=base['Normal'],
                fontSize=8, fontName='Helvetica-Bold',
                leading=10, textColor=self.text_muted,
            ),
            'date_key': ParagraphStyle(
                'DateKey', parent=base['Normal'],
                fontSize=7, fontName='Helvetica-Bold',
                leading=9, textColor=self.text_muted,
                alignment=2,  # TA_RIGHT
            ),
            'date_val': ParagraphStyle(
                'DateVal', parent=base['Normal'],
                fontSize=9, fontName='Helvetica',
                leading=11, textColor=self.text_dark,
                alignment=2,  # TA_RIGHT
            ),
            'section_heading': ParagraphStyle(
                'SectionHeading', parent=base['Normal'],
                fontSize=10, textColor=self.accent,
                fontName='Helvetica-Bold', leading=12,
            ),
            'body': ParagraphStyle(
                'Body', parent=base['Normal'],
                fontSize=10, textColor=self.text_body,
                leading=16, fontName='Helvetica',
            ),
            'field_label': ParagraphStyle(
                'FieldLabel', parent=base['Normal'],
                fontSize=8, textColor=self.text_muted,
                fontName='Helvetica-Bold', leading=10,
            ),
            'field_value': ParagraphStyle(
                'FieldValue', parent=base['Normal'],
                fontSize=10, textColor=self.text_dark,
                fontName='Helvetica', leading=13,
            ),
            'badge': ParagraphStyle(
                'Badge', parent=base['Normal'],
                fontSize=8, fontName='Helvetica-Bold',
                leading=11, alignment=TA_CENTER,
            ),
        }

    # ── Header ──────────────────────────────────────────────────────────────

    def _header_block(self, s, usable_w):
        title_p = Paragraph('RISHABH JAIN', s['doc_title'])
        sub_p = Paragraph('PORTFOLIO OUTREACH SUBMISSION', s['doc_subtitle'])
        
        left_table = Table([[title_p], [sub_p]], colWidths=[usable_w - 150])
        left_table.setStyle(TableStyle([
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        
        submission_date = datetime.now().strftime('%d %b %Y %I:%M %p')
        date_p_key = Paragraph('DATE RECEIVED', s['date_key'])
        date_p_val = Paragraph(submission_date, s['date_val'])
        
        right_table = Table([[date_p_key], [date_p_val]], colWidths=[150])
        right_table.setStyle(TableStyle([
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        
        header_table = Table([[left_table, right_table]], colWidths=[usable_w - 150, 150])
        header_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        return header_table

    # ── Details List ────────────────────────────────────────────────────────

    def _details_table(self, s, usable_w, full_name, phone, email, purpose, company, budget, source):
        # Create purpose pill badge
        text_color_hex, bg_color_hex = PURPOSE_COLORS.get(purpose, ('#4b5563', '#f3f4f6'))
        badge_style = ParagraphStyle(
            'BadgeText',
            parent=s['badge'],
            textColor=colors.HexColor(text_color_hex),
            fontSize=8,
            fontName='Helvetica-Bold',
        )
        badge_p = Paragraph(purpose.upper(), badge_style)
        badge_table = Table([[badge_p]], hAlign='LEFT')
        badge_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor(bg_color_hex)),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 2),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ]))

        def make_row(label, val_content):
            label_p = Paragraph(label.upper(), s['field_label'])
            if isinstance(val_content, str):
                val_p = Paragraph(val_content or '—', s['field_value'])
            else:
                val_p = val_content
            return [label_p, val_p]

        rows = [
            make_row('Contact Name', full_name),
            make_row('Email Address', email),
            make_row('Phone Number', phone),
            make_row('Company / Org', company or None),
            make_row('Inquiry Purpose', badge_table),
            make_row('Budget Range', budget or None),
            make_row('Acquisition Channel', source or None),
        ]

        t = Table(rows, colWidths=[usable_w * 0.3, usable_w * 0.7])
        t.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ('LINEBELOW', (0, 0), (-1, -2), 0.5, self.divider),
            # Alternating background colours
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f8fafc')),
            ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#f8fafc')),
            ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#f8fafc')),
            ('BACKGROUND', (0, 6), (-1, 6), colors.HexColor('#f8fafc')),
        ]))
        return t

    # ── Main generate ────────────────────────────────────────────────────────

    def generate(
        self,
        full_name: str,
        phone: str,
        email: str,
        introduction: str,
        purpose: str = 'Just Saying Hi',
        company: str = '',
        budget: str = '',
        source: str = '',
        pdf_filename: str = '',
    ) -> str:
        filename = self.generate_filename(pdf_filename)
        filepath = os.path.join(self.output_dir, filename)

        page_w, _ = A4
        margin = 44
        usable_w = page_w - 2 * margin

        doc = SimpleDocTemplate(
            filepath, pagesize=A4,
            rightMargin=margin, leftMargin=margin,
            topMargin=margin, bottomMargin=margin,
        )

        s = self._styles()
        elements = []

        # Header
        elements.append(self._header_block(s, usable_w))
        elements.append(Spacer(1, 10))
        elements.append(Divider(usable_w, thickness=1.5, color=self.primary))
        elements.append(Spacer(1, 18))

        # Helper for section headers
        def add_section_header(title):
            sect_header_elements = [
                Paragraph(title.upper(), s['section_heading']),
                Spacer(1, 4),
                Divider(usable_w, thickness=0.75, color=self.divider),
                Spacer(1, 10),
            ]
            return sect_header_elements

        # Inquiry Details
        elements.extend(add_section_header('Outreach Profile & Details'))
        elements.append(self._details_table(s, usable_w, full_name, phone, email, purpose, company, budget, source))
        elements.append(Spacer(1, 22))

        # Introduction / Message
        elements.extend(add_section_header('Submitted Message / Introduction'))
        
        formatted_intro = introduction.strip().replace('\n', '<br/>')
        intro_p = Paragraph(formatted_intro, s['body'])
        
        intro_t = Table([[intro_p]], colWidths=[usable_w])
        intro_t.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), self.surface),
            ('BOX',           (0, 0), (-1, -1), 0.75, self.divider),
            ('LINEBEFORE',    (0, 0), (0, -1), 3.5, self.accent),
            ('TOPPADDING',    (0, 0), (-1, -1), 14),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
            ('LEFTPADDING',   (0, 0), (-1, -1), 16),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 16),
        ]))
        elements.append(intro_t)

        def add_page_decorations(canvas, doc_obj):
            canvas.saveState()
            # Top accent bar (Navy primary)
            canvas.setFillColor(self.primary)
            canvas.rect(0, A4[1] - 6, A4[0], 6, fill=1, stroke=0)
            
            # Bottom footer
            canvas.setFont('Helvetica-Bold', 8)
            canvas.setFillColor(self.text_muted)
            canvas.drawString(margin, 24, "RISHABH JAIN • PORTFOLIO")
            
            canvas.setFont('Helvetica', 8)
            canvas.drawString(margin + 124, 24, "|  Lead System Record")
            canvas.drawRightString(A4[0] - margin, 24, f"Page {doc_obj.page}")
            
            # Line above footer
            canvas.setStrokeColor(self.divider)
            canvas.setLineWidth(0.5)
            canvas.line(margin, 36, A4[0] - margin, 36)
            canvas.restoreState()

        doc.build(elements, onFirstPage=add_page_decorations, onLaterPages=add_page_decorations)
        return filename


# ── Quick test ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    # Write to local relative directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(current_dir, '..', 'generated_pdfs')
    os.makedirs(output_path, exist_ok=True)
    
    gen = PDFGenerator(output_path)
    fname = gen.generate(
        full_name='John Doe',
        phone='+91 98765 43210',
        email='john@example.com',
        introduction=(
            'Hi, I came across your portfolio and I am really impressed by your work. '
            'I have a React + Node.js project that needs a skilled developer.\n\n'
            'The project involves building a SaaS dashboard with real-time analytics. '
            'Would love to discuss scope and timeline at your earliest convenience.'
        ),
        purpose='Freelance Project',
        company='Acme Corp',
        budget='$2,000–$5,000',
        source='LinkedIn',
    )
    print(f'Generated: {os.path.abspath(os.path.join(output_path, fname))}')