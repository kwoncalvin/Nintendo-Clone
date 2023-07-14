from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, db
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)


@product_routes.route('')
def get_all_products():
    """
    Query for all products and returns them in a dictionary of product.id to product info
    """
    products = Product.query.all()
    return {'all_products': {product.id: product.to_dict() for product in products}}


@product_routes.route('/<int:productId>')
def get_single_product(id):
    """
    Query for a product by id and returns that product in a dictionary
    """
    product = Product.query.get(id)
    return {'single_product': product.to_dict()}

@product_routes.route("/current")
@login_required
def get_current_products():
    """
    This route will return a list of products posted by the current user.
    """
    products = Product.query.filter(Product.user_id == current_user.id).all()
    return {"current_products": {product.id: product.to_dict() for product in products}}

@product_routes.route('/new', methods=["POST"])
@login_required
def create_restaurant():
    """
    This route will create a product
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # image = form.data["image_url"]
        # image.filename = get_unique_filename(image.filename)
        # upload = upload_file_to_s3(image)

        new_product = Product(
            user_id = current_user.id,
            name = form.data['name'],
            description_header = form.data['description_header'],
            description = form.data['description'],
            release_date = form.data['release_date'],
            # imageUrl =  upload['url'],
            image_url = form.data['image_url']
        )
        db.session.add(new_product)
        db.session.commit()

        return {"new_product": new_product.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:productId>', methods=["PUT"])
@login_required
def update_restaurant(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return {'errors': ['Product does not exist']}, 404
    if product.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403
    """
    This route will update a product.
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product.name = form.data['name']
        product.description_header = form.data['description_header']
        product.description = form.data['description']
        product.release_date = form.data['release_date']
        product.image_url = form.data['image_url']

        db.session.commit()
        return {"updated_product": product.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/<int:productId>/delete", methods=['DELETE'])
@login_required
def delete_product(product_id):
    """
    This route will delete a product.
    """
    product = Product.query.get(product_id)

    if product is None:
        return {'errors': ['product does not exist']}, 404
    if product.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403
    db.session.delete(product)
    db.session.commit()
    return {'message': ['Product successfully deleted']}
