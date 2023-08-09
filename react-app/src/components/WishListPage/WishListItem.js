import React, { useEffect } from "react";
import { useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import './WishListPage.css'
import { deleteFavorite, postFavorite } from "../../store/favorites";
import AddToCart from "../ProductPage/AddToCart";

const WishListItem = ({product}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const favorites = useSelector((state) => state.favorites.currentFavorites)
    let date;
    if (product.releaseDate) {
        date = new Date(product.releaseDate)
        date = date.toLocaleDateString("en-US");
    }

    let favorite = Object.values(favorites).filter((favorite) => favorite.user_id == user.id && favorite.product_id == product.id);

    const handleFavorite = e => {
        e.stopPropagation();

        if (!user) {
            history.push('/login')
        }
        let payload = {
            'product_id': product.id
        }

        dispatch(postFavorite(payload))
    }

    const removeFavorite = e => {
        e.stopPropagation();

        if (!user) {
            history.push('/login')
        }

        dispatch(deleteFavorite(favorite[0].id));
    }


    return (
        <div
            class='wish-list-item-wrapper'
        >
            <div className="wish-list-left">
                <img src={product.imageUrl || '/logo.png'} onClick={() => history.push(`/store/products/${product.id}`)}/>
                <div onClick={() => history.push(`/store/products/${product.id}`)}>
                    <h4>{product.name}</h4>
                    <p>{date}</p>
                </div>
            </div>
            <div className="wish-list-right">
                <h4>${product.price}</h4>
                <AddToCart product={product} quantity={1}/>
                {favorite.length > 0 ?
                    <i class="fa-solid fa-heart" onClick={removeFavorite}></i> :
                    <i class="fa-regular fa-heart" onClick={handleFavorite}></i>
                }
            </div>
        </div>
    )
}

export default WishListItem;
