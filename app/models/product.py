from .db import db, environment, SCHEMA, add_prefix_for_prod



class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(255), nullable=False, unique=True)
    description_header = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    release_date = db.Column(db.Date)
    image_url = db.Column(db.String(255))

    user = db.relationship("User", back_populates="products")
    cart_items = db.relationship("CartItem", back_populates="product", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'descriptionHeader': self.description_header,
            'description': self.description,
            'releaseDate': self.release_date,
            'imageUrl': self.image_url
        }
