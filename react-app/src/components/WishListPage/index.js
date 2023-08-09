import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCurrentFavorites } from "../../store/favorites";
import WishListItem from "./WishListItem";

import './WishListPage.css'

const WishListPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const favorites = useSelector((state) => state.favorites.currentFavorites)

    useEffect(() => {
        dispatch(getCurrentFavorites());
    }, [dispatch])

    return (
        <div className="dodge-nav" id="current-products-wrap">
            <div className="current-products">
                <div className='your-path'>
                    <div className="path-link" onClick={() => history.push('/')}>Home</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className='your-link'>Wish List</div>
                </div>
                <h1>Wish List</h1>
                <div style={{'margin-bottom': '1rem'}}>Explore, purchase, or remove items from your Wish List here.</div>
                <div className="current-products-preview">
                    <div className="favorite-products-list">
                        {Object.values(favorites).map((favorite) => {
                            return (
                                <WishListItem
                                    key={favorite.Product.id}
                                    product={favorite.Product}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListPage;
