from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, TextAreaField, DateField
from wtforms.validators import DataRequired, Length

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    description_header = StringField('Description Header', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired()])
    release_date = DateField('Release Date', validators=[DataRequired()])
    image_url = StringField('ImageUrl', validators=[DataRequired()])
