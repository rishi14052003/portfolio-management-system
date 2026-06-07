"""Email HTML templates"""


def get_user_confirmation_template(full_name: str, pdf_filename: str) -> str:
    """Generate HTML email template for user confirmation"""
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f3ff;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
                font-weight: 700;
            }}
            .header p {{
                margin: 8px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
            }}
            .content {{
                padding: 40px 30px;
            }}
            .greeting {{
                font-size: 18px;
                color: #1e1b4b;
                margin: 0 0 20px 0;
                font-weight: 600;
            }}
            .message {{
                font-size: 14px;
                color: #374151;
                line-height: 1.6;
                margin: 15px 0;
            }}
            .highlight {{
                background-color: #f0f4ff;
                border-left: 4px solid #6366f1;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }}
            .highlight-text {{
                color: #6366f1;
                font-weight: 600;
            }}
            .button {{
                display: inline-block;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin-top: 20px;
                transition: all 0.3s ease;
            }}
            .button:hover {{
                opacity: 0.9;
            }}
            .footer {{
                background-color: #f9fafb;
                padding: 20px 30px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }}
            .footer a {{
                color: #6366f1;
                text-decoration: none;
            }}
            .badge {{
                display: inline-block;
                background-color: #dbeafe;
                color: #1d4ed8;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✓ Submission Received</h1>
                <p>Your message has been successfully submitted</p>
            </div>

            <div class="content">
                <p class="greeting">Hello {full_name},</p>

                <p class="message">
                    Thank you for reaching out! We have successfully received your submission and generated your PDF file.
                </p>

                <div class="highlight">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #1e1b4b;">What happens next?</p>
                    <p style="margin: 8px 0; font-size: 13px; color: #374151;">
                        ✓ Your PDF file has been attached to this email<br>
                        ✓ We'll review your submission and get back to you soon<br>
                        ✓ Keep an eye on your inbox for our response
                    </p>
                </div>

                <p class="message">
                    If you have any questions or need to make changes, feel free to reach out to us directly.
                </p>

                <p style="margin-top: 30px; color: #6b7280;">
                    <span class="badge">PDF File: {pdf_filename}</span>
                </p>
            </div>

            <div class="footer">
                <p style="margin: 0 0 10px 0;">
                    © 2026 Rishabh Jain. All rights reserved.
                </p>
                <p style="margin: 0;">
                    <a href="https://rishabhjain.dev">Visit my portfolio</a> | 
                    <a href="https://linkedin.com">Connect on LinkedIn</a>
                </p>
            </div>
        </div>
    </body>
    </html>
    """


def get_admin_notification_template(
    full_name: str,
    email: str,
    phone: str,
    purpose: str,
    company: str,
    source: str,
    introduction: str,
) -> str:
    """Generate HTML email template for admin notification"""
    
    purpose_colors = {
        'Job Opportunity': ('#1d4ed8', '#dbeafe'),
        'Freelance Project': ('#b45309', '#fef3c7'),
        'Collaboration': ('#065f46', '#d1fae5'),
        'Just Saying Hi': ('#6b21a8', '#f3e8ff'),
    }
    
    purpose_color, purpose_bg = purpose_colors.get(purpose, ('#6366f1', '#e0e7ff'))
    
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f3ff;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                font-weight: 700;
            }}
            .header p {{
                margin: 8px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
            }}
            .content {{
                padding: 30px;
            }}
            .alert-banner {{
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 0 0 20px 0;
                border-radius: 4px;
                color: #92400e;
                font-size: 13px;
            }}
            .info-grid {{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 20px 0;
            }}
            .info-item {{
                background-color: #f9fafb;
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
            }}
            .info-label {{
                font-size: 11px;
                color: #6b7280;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin: 0 0 5px 0;
            }}
            .info-value {{
                font-size: 14px;
                color: #1f2937;
                font-weight: 600;
            }}
            .badge {{
                display: inline-block;
                background-color: {purpose_bg};
                color: {purpose_color};
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }}
            .message-box {{
                background-color: #f5f3ff;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                border-left: 3px solid #8b5cf6;
            }}
            .message-label {{
                font-size: 11px;
                color: #6b21a8;
                font-weight: 700;
                text-transform: uppercase;
                margin: 0 0 8px 0;
            }}
            .message-text {{
                font-size: 13px;
                color: #374151;
                line-height: 1.6;
                margin: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
            }}
            .action-buttons {{
                margin: 25px 0;
                display: flex;
                gap: 10px;
            }}
            .btn {{
                flex: 1;
                padding: 12px;
                text-align: center;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 13px;
                transition: all 0.3s ease;
            }}
            .btn-primary {{
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
            }}
            .btn-secondary {{
                background-color: #e5e7eb;
                color: #1f2937;
            }}
            .footer {{
                background-color: #f9fafb;
                padding: 20px 30px;
                text-align: center;
                font-size: 11px;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 New Lead Submission</h1>
                <p>A new contact form submission has been received</p>
            </div>

            <div class="content">
                <div class="alert-banner">
                    <strong>⚡ New submission from {full_name}</strong><br>
                    Check the details below and respond within 24 hours for the best experience.
                </div>

                <div style="margin-bottom: 20px;">
                    <div class="info-label">Purpose of Contact</div>
                    <span class="badge">{purpose}</span>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Name</div>
                        <div class="info-value">{full_name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value" style="word-break: break-all;">{email}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phone</div>
                        <div class="info-value">{phone}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Company</div>
                        <div class="info-value">{company or 'N/A'}</div>
                    </div>
                    <div class="info-item" style="grid-column: 1 / -1;">
                        <div class="info-label">Found You Via</div>
                        <div class="info-value">{source or 'Not specified'}</div>
                    </div>
                </div>

                <div class="message-box">
                    <div class="message-label">Message</div>
                    <p class="message-text">{introduction}</p>
                </div>

                <div class="action-buttons">
                    <a href="https://rishabhjain.dev/admin/leads" class="btn btn-primary">View in Admin Dashboard</a>
                    <a href="mailto:{email}" class="btn btn-secondary">Reply to Lead</a>
                </div>
            </div>

            <div class="footer">
                <p style="margin: 0;">
                    This is an automated notification from your portfolio submission system.
                </p>
            </div>
        </div>
    </body>
    </html>
    """
