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


class CircularMonogram(Flowable):
    def __init__(self, text, size=48, bg_color=None, text_color=None):
        super().__init__()
        self.text = text
        self.size = size
        self.bg_color = bg_color or colors.HexColor('#6366f1')
        self.text_color = text_color or colors.white

    def wrap(self, availWidth, availHeight):
        return self.size, self.size

    def draw(self):
        self.canv.saveState()
        self.canv.setFillColor(self.bg_color)
        self.canv.setStrokeColor(self.bg_color)
        radius = self.size / 2
        self.canv.circle(radius, radius, radius, fill=1, stroke=0)
        
        self.canv.setFillColor(self.text_color)
        self.canv.setFont('Helvetica-Bold', self.size * 0.45)
        self.canv.drawCentredString(radius, radius - (self.size * 0.15), self.text)
        self.canv.restoreState()


class Divider(Flowable):
    def __init__(self, width, thickness=1, color=None):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.color = color or colors.HexColor('#e0e7ff')

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

        # Brand palette
        self.primary    = colors.HexColor('#6366f1')
        self.primary_dk = colors.HexColor('#4f46e5')
        self.accent     = colors.HexColor('#8b5cf6')
        self.accent_lt  = colors.HexColor('#a78bfa')
        self.surface    = colors.HexColor('#f5f3ff')
        self.surface2   = colors.HexColor('#ede9fe')
        self.text_dark  = colors.HexColor('#1e1b4b')
        self.text_body  = colors.HexColor('#374151')
        self.text_muted = colors.HexColor('#6b7280')
        self.white      = colors.HexColor('#ffffff')
        self.divider    = colors.HexColor('#e0e7ff')

    # ── Helpers ─────────────────────────────────────────────────────────────

    def generate_filename(self, custom_name: str = '') -> str:
        if custom_name and isinstance(custom_name, str):
            return f'{custom_name.strip()}.pdf'
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return f'submission_{timestamp}.pdf'

    def _make_monogram(self, full_name: str) -> str:
        parts = full_name.strip().split()
        if len(parts) >= 2:
            return (parts[0][0] + parts[-1][0]).upper()
        elif parts:
            return parts[0][:2].upper()
        return 'NA'

    def _styles(self):
        base = getSampleStyleSheet()
        return {
            'monogram': ParagraphStyle(
                'Monogram', parent=base['Normal'],
                fontSize=42, textColor=self.white,
                alignment=TA_CENTER, fontName='Helvetica-Bold', leading=48,
            ),
            'brand': ParagraphStyle(
                'Brand', parent=base['Normal'],
                fontSize=13, textColor=self.white,
                alignment=TA_LEFT, fontName='Helvetica', leading=18, spaceAfter=0,
            ),
            'brand_sub': ParagraphStyle(
                'BrandSub', parent=base['Normal'],
                fontSize=10, textColor=colors.HexColor('#c4b5fd'),
                alignment=TA_LEFT, fontName='Helvetica', leading=15,
            ),
            'section_label': ParagraphStyle(
                'SectionLabel', parent=base['Normal'],
                fontSize=9, textColor=self.accent_lt,
                fontName='Helvetica-Bold', leading=14, spaceBefore=4, spaceAfter=2,
            ),
            'section_heading': ParagraphStyle(
                'SectionHeading', parent=base['Normal'],
                fontSize=12, textColor=self.text_dark,
                fontName='Helvetica-Bold', leading=16,
            ),
            'body': ParagraphStyle(
                'Body', parent=base['Normal'],
                fontSize=11, textColor=self.text_body,
                leading=19, fontName='Helvetica', spaceAfter=0,
            ),
            'meta_key': ParagraphStyle(
                'MetaKey', parent=base['Normal'],
                fontSize=9, textColor=self.primary,
                fontName='Helvetica-Bold', leading=14,
            ),
            'meta_val': ParagraphStyle(
                'MetaVal', parent=base['Normal'],
                fontSize=10, textColor=self.text_body,
                fontName='Helvetica', leading=16,
            ),
            'card_label': ParagraphStyle(
                'CardLabel', parent=base['Normal'],
                fontSize=8, textColor=self.primary,
                fontName='Helvetica-Bold', leading=12,
            ),
            'card_val': ParagraphStyle(
                'CardVal', parent=base['Normal'],
                fontSize=11, textColor=self.text_dark,
                fontName='Helvetica', leading=16,
            ),
            'badge': ParagraphStyle(
                'Badge', parent=base['Normal'],
                fontSize=9, fontName='Helvetica-Bold',
                leading=13, alignment=TA_CENTER,
            ),
            'extra_key': ParagraphStyle(
                'ExtraKey', parent=base['Normal'],
                fontSize=9, textColor=self.text_muted,
                fontName='Helvetica-Bold', leading=14,
            ),
            'extra_val': ParagraphStyle(
                'ExtraVal', parent=base['Normal'],
                fontSize=10, textColor=self.text_body,
                fontName='Helvetica', leading=15,
            ),
        }

    # ── Header ──────────────────────────────────────────────────────────────

    def _header_block(self, s, usable_w, full_name, purpose):
        monogram = self._make_monogram(full_name)
        mono_flowable = CircularMonogram(
            monogram,
            size=48,
            bg_color=self.primary,
            text_color=self.white
        )
        
        name_style = ParagraphStyle(
            'HeaderName', parent=s['brand'],
            fontSize=16, fontName='Helvetica-Bold',
            leading=20, spaceAfter=2,
            textColor=self.text_dark,
        )
        sub_style = ParagraphStyle(
            'HeaderSub', parent=s['brand_sub'],
            fontSize=8, leading=12,
            textColor=self.text_muted,
        )
        
        from reportlab.lib.enums import TA_RIGHT
        date_key_style = ParagraphStyle(
            'DateKey', parent=s['meta_key'],
            fontSize=8, fontName='Helvetica-Bold',
            alignment=TA_RIGHT,
            textColor=self.primary,
        )
        date_val_style = ParagraphStyle(
            'DateVal', parent=s['meta_val'],
            fontSize=9, fontName='Helvetica',
            alignment=TA_RIGHT,
            textColor=self.text_body,
        )
        
        submission_date = datetime.now().strftime('%d %b %Y %I:%M %p')
        
        brand_w = usable_w - 60 - 140
        
        details_inner = Table(
            [
                [Paragraph(full_name, name_style)],
                [Paragraph('PORTFOLIO LEAD SUBMISSION', sub_style)],
            ],
            colWidths=[brand_w],
        )
        details_inner.setStyle(TableStyle([
            ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
            ('LEFTPADDING',   (0, 0), (-1, -1), 0),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
            ('TOPPADDING',    (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        
        date_inner = Table(
            [
                [Paragraph('SUBMITTED ON', date_key_style)],
                [Paragraph(submission_date, date_val_style)],
            ],
            colWidths=[140],
        )
        date_inner.setStyle(TableStyle([
            ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
            ('LEFTPADDING',   (0, 0), (-1, -1), 0),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
            ('TOPPADDING',    (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        
        header_table = Table(
            [[mono_flowable, details_inner, date_inner]],
            colWidths=[60, brand_w, 140],
        )
        header_table.setStyle(TableStyle([
            ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
            ('LEFTPADDING',   (0, 0), (-1, -1), 0),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
            ('TOPPADDING',    (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ]))
        return header_table

    # ── Contact cards ───────────────────────────────────────────────────────

    def _contact_cards(self, s, usable_w, full_name, phone, email):
        def card(label, value):
            return Table(
                [
                    [Paragraph(label.upper(), s['card_label'])],
                    [Spacer(1, 4)],
                    [Paragraph(value, s['card_val'])],
                ],
                colWidths=['100%'],
            )

        card_w = usable_w / 3
        t = Table(
            [[card('Name', full_name), card('Phone', phone), card('Email', email)]],
            colWidths=[card_w, card_w, card_w],
        )
        t.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), self.surface),
            ('BOX',           (0, 0), (-1, -1), 1, self.divider),
            ('LINEBEFORE',    (1, 0), (-1, 0), 1, self.divider),
            ('TOPPADDING',    (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('LEFTPADDING',   (0, 0), (-1, -1), 16),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 16),
            ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        return t

    # ── Extra details (purpose, company, budget, source) ────────────────────

    def _extra_details_table(self, s, usable_w, purpose, company, budget, source):
        half = usable_w / 2

        # Create purpose pill badge
        text_color_hex, bg_color_hex = PURPOSE_COLORS.get(purpose, ('#4b5563', '#f3f4f6'))
        badge_style = ParagraphStyle(
            'BadgeText',
            parent=s['badge'],
            textColor=colors.HexColor(text_color_hex),
            fontSize=8,
            fontName='Helvetica-Bold',
            alignment=TA_LEFT,
        )
        badge_p = Paragraph(purpose.upper(), badge_style)
        badge_table = Table([[badge_p]], hAlign='LEFT')
        badge_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor(bg_color_hex)),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ]))

        def cell(label, value, is_badge=False, badge_element=None):
            if is_badge and badge_element:
                val_content = badge_element
            else:
                if not value:
                    value = '—'
                val_content = Paragraph(value, s['extra_val'])

            return Table(
                [
                    [Paragraph(label.upper(), s['extra_key'])],
                    [Spacer(1, 4)],
                    [val_content],
                ],
                colWidths=['100%'],
            )

        rows = [
            [cell('Purpose', purpose, is_badge=True, badge_element=badge_table), cell('Company / Organization', company or None)],
            [cell('Budget Range', budget or None), cell('How They Found You', source or None)],
        ]

        t = Table(rows, colWidths=[half, half])
        t.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), self.surface),
            ('BOX',           (0, 0), (-1, -1), 1, self.divider),
            ('LINEAFTER',     (0, 0), (0, -1), 1, self.divider),
            ('LINEBELOW',     (0, 0), (-1, 0), 1, self.divider),
            ('TOPPADDING',    (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('LEFTPADDING',   (0, 0), (-1, -1), 16),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 16),
            ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
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
        elements.append(self._header_block(s, usable_w, full_name, purpose))
        elements.append(Spacer(1, 12))
        elements.append(Divider(usable_w, thickness=1.5, color=self.divider))
        elements.append(Spacer(1, 16))

        # Helper for section headers
        def section_header(title):
            t = Table([[Paragraph(title.upper(), s['section_heading'])]], colWidths=[usable_w])
            t.setStyle(TableStyle([
                ('LINEBEFORE', (0, 0), (0, -1), 3, self.primary),
                ('LEFTPADDING', (0, 0), (-1, -1), 10),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 2),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
            ]))
            return t

        # Contact Information
        elements.append(section_header('Contact Information'))
        elements.append(Spacer(1, 10))
        elements.append(self._contact_cards(s, usable_w, full_name, phone, email))
        elements.append(Spacer(1, 22))

        # Inquiry Details
        elements.append(section_header('About This Inquiry'))
        elements.append(Spacer(1, 10))
        elements.append(self._extra_details_table(s, usable_w, purpose, company, budget, source))
        elements.append(Spacer(1, 22))

        # Introduction / Message
        elements.append(section_header('Introduction / Message'))
        elements.append(Spacer(1, 10))
        
        formatted_intro = introduction.strip().replace('\n', '<br/>')
        intro_p = Paragraph(formatted_intro, s['body'])
        
        intro_t = Table([[intro_p]], colWidths=[usable_w])
        intro_t.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), self.surface),
            ('BOX',           (0, 0), (-1, -1), 1, self.divider),
            ('LINEBEFORE',    (0, 0), (0, -1), 4, self.primary),
            ('TOPPADDING',    (0, 0), (-1, -1), 14),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
            ('LEFTPADDING',   (0, 0), (-1, -1), 16),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 16),
        ]))
        elements.append(intro_t)

        def add_page_decorations(canvas, doc_obj):
            canvas.saveState()
            # Top accent bar (Indigo)
            canvas.setFillColor(self.primary)
            canvas.rect(0, A4[1] - 6, A4[0], 6, fill=1, stroke=0)
            
            # Bottom footer
            canvas.setFont('Helvetica', 8)
            canvas.setFillColor(colors.HexColor('#6b7280')) # Gray 500
            canvas.drawString(margin, 24, "Rishabh Jain Portfolio • Lead Notification System")
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