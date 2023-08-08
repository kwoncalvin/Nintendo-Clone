from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Favorite, db

favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('')
@login_required
def get_current_favorites():
    """
    This route will return all products in the current user's favorites.
    """
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    return {"favorites": {favorite.id: favorite.to_dict() for favorite in favorites}}

@favorite_routes.route('/add', methods=["POST"])
@login_required
def add_favorite():
    """
    This route will add a product to the current user's favorites.
    """
    req = request.get_json()

    productId = req['product_id']

    new_favorite = Favorite(
        user_id = current_user.id,
        product_id = productId
    )
    db.session.add(new_favorite)
    db.session.commit()
    return {"favorite": new_favorite.to_dict()}


@favorite_routes.route("/<int:favoriteId>/delete", methods=['DELETE'])
@login_required
def delete_favorite(favoriteId):
    """
    This route will delete a product from the current user's favorites.
    """
    favorite = Favorite.query.get(favoriteId)

    if favorite is None:
        return {'errors': ['Favorite does not exist']}, 404
    if favorite.user_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403

    db.session.delete(favorite)
    db.session.commit()
    return {'message': ['Favorite successfully deleted']}

@favorite_routes.route("/delete", methods=['DELETE'])
@login_required
def clear_favorites():
    """
    This route will clear the current user's favorites.
    """
    delete_q = Favorite.__table__.delete().where(Favorite.user_id == current_user.id)

    db.session.execute(delete_q)
    db.session.commit()
    return {'message': ['Favorites successfully cleared']}
