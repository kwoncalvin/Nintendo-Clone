from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, DateField
from wtforms.validators import DataRequired, Length
from app.models import Product

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    price = DecimalField('Price', validators=[DataRequired()])
    description_header = StringField('Description Header', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired()])
    release_date = DateField('Release Date', format='%Y-%m-%d', validators=[DataRequired()])
    image_url = StringField('ImageUrl', validators=[DataRequired()])
    desc_image_url = StringField('ImageUrl')
    category = StringField('Category', validators=[DataRequired()])
    esrb = StringField('ESRB')
    color = StringField('Color')
