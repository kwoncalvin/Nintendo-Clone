from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import CartItem, db

cart_item_routes = Blueprint('cart_items', __name__)


@cart_item_routes.route('')
@login_required
def get_current_cart_items():
    """
    This route will return all products in the current user's cart.
    """
    cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).all()
    return {"cart_items": {cart_item.id: cart_item.to_dict() for cart_item in cart_items}}

@cart_item_routes.route('/add', methods=["POST"])
@login_required
def add_cart_item():
    """
    This route will add a product to the current user's cart.
    """
    req = request.get_json()

    quantity = req['quantity']
    productId = req['productId']

    new_cart_item = CartItem(
        user_id = current_user.id,
        productId = productId,
        quantity = quantity
    )
    db.session.add(new_cart_item)
    db.session.commit()
    return {"cart_item": new_cart_item.to_dict()}

@cart_item_routes.route('/<int:cartItemId>/update', methods=["PUT"])
@login_required
def update_quantity(cartItemId):
    """
    This route will change the quantity of a product in the current user's cart.
    """
    cart_item = CartItem.query.get(cartItemId)

    if cart_item is None:
        return {'errors': ['Cart item does not exist']}, 404
    if cart_item.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403

    req = request.get_json()
    cart_item.quantity = req['quantity']
    db.session.commit()
    return {"cart_item": cart_item.to_dict()}

@cart_item_routes.route("/<int:cartItemId>/delete", methods=['DELETE'])
@login_required
def delete_cart_item(cartItemId):
    """
    This route will delete a product from the cart.
    """
    cart_item = CartItem.query.get(cartItemId)

    if cart_item is None:
        return {'errors': ['Cart item does not exist']}, 404
    if cart_item.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403

    db.session.delete(cart_item)
    db.session.commit()
    return {'message': ['Cart item successfully deleted']}

@cart_item_routes.route("/cart/delete", methods=['DELETE'])
@login_required
def clear_cart():
    """
    This route will clear the current user's cart
    """
    delete_q = CartItem.__table__.delete().where(CartItem.user_id == current_user.id)

    db.session.execute(delete_q)
    db.session.commit()
    return {'message': ['Cart successfully cleared']}
