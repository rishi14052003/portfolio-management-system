from marshmallow import Schema, fields, validate, ValidationError, pre_load, post_load
import re


def validate_filename(value):
    """Validate PDF filename - only alphanumeric, spaces, hyphens, underscores"""
    if value and not re.match(r'^[a-zA-Z0-9_\s-]+$', value):
        raise ValidationError('PDF filename can only contain letters, numbers, spaces, hyphens, and underscores')


def validate_name(value):
    """Validate full name - only letters, spaces, hyphens, apostrophes"""
    if not re.match(r"^[a-zA-Z\s'-]+$", value):
        raise ValidationError('Name can only contain letters, spaces, hyphens, and apostrophes')


class ContactSchema(Schema):
    full_name = fields.Str(
        required=True,
        validate=[validate.Length(min=3, max=100), validate_name]
    )
    phone = fields.Str(required=True, validate=validate.Length(min=10, max=15))
    email = fields.Email(required=True, validate=validate.Length(max=255))
    introduction = fields.Str(
        required=True,
        validate=validate.Length(min=20, max=1000)
    )
    purpose = fields.Str(
        required=True,
        validate=validate.OneOf(['Job Opportunity', 'Freelance Project', 'Collaboration', 'Just Saying Hi'])
    )
    company = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    budget = fields.Str(
        required=False,
        validate=validate.OneOf(['Less than $500', '$500–$2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000+', 'Not Specified']),
        allow_none=True
    )
    source = fields.Str(
        required=False,
        validate=validate.OneOf(['LinkedIn', 'GitHub', 'Portfolio Website', 'Google Search', 'Referral', 'Other']),
        allow_none=True
    )
    pdf_filename = fields.Str(
        required=False,
        validate=[validate.Length(max=100), validate_filename],
        allow_none=True,
        load_default=''
    )

    @pre_load
    def preprocess(self, data, **kwargs):
        """Trim whitespace from string fields"""
        for key in ['full_name', 'company', 'introduction']:
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        return data


class LoginSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3))
    password = fields.Str(required=True, validate=validate.Length(min=6))


contact_schema = ContactSchema()
login_schema = LoginSchema()
