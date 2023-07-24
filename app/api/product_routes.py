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
def get_single_product(productId):
    """
    Query for a product by id and returns that product in a dictionary
    """
    product = Product.query.get(productId)
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
def create_product():
    """
    This route will create a product
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # image = form.data["image_url"]
        # image.filename = get_unique_filename(image.filename)
        # upload = upload_file_to_s3(image)
        print(form.name.data)
        print(form.price.data)
        print(form.description_header.data)
        print(form.description.data)
        print(form.release_date.data)
        print(form.image_url.data)
        print(form.desc_image_url.data)
        print(form.category.data)
        print(form.esrb.data)
        print(form.color.data)
        new_product = Product(
            user_id = current_user.id,
            name = form.name.data,
            price = form.price.data,
            description_header = form.description_header.data,
            description = form.description.data,
            release_date = form.release_date.data,
            # imageUrl =  upload['url'],
            image_url = form.image_url.data,
            desc_image_url = form.desc_image_url.data,
            category = form.category.data,
            esrb = form.esrb.data,
            color = form.color.data
        )
        db.session.add(new_product)
        db.session.commit()

        return {"new_product": new_product.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:productId>/update', methods=["PUT"])
@login_required
def update_product(productId):
    product = Product.query.get(productId)
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
        product.name = form.name.data
        product.price = form.price.data
        product.description_header = form.description_header.data
        product.description = form.description.data
        product.release_date = form.release_date.data
        product.image_url = form.image_url.data
        product.desc_image_url = form.desc_image_url.data
        product.category = form.category.data
        product.esrb = form.esrb.data
        product.color = form.color.data

        db.session.commit()
        return {"updated_product": product.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/<int:productId>/delete", methods=['DELETE'])
@login_required
def delete_product(productId):
    """
    This route will delete a product.
    """
    product = Product.query.get(productId)

    if product is None:
        return {'errors': ['product does not exist']}, 404
    if product.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403
    db.session.delete(product)
    db.session.commit()
    return {'message': ['Product successfully deleted']}
