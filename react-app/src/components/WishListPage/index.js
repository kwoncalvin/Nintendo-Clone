import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import ProductPreview from "../ProductPreview";

import './WishListPage.css'

const WishListPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const favorites = useSelector((state) => state.favorites.currentFavorites)

    // useEffect(() => {
    //     dispatch(getCurrentProducts());
    // }, [dispatch])

    return (
        <div className="dodge-nav" id="current-products-wrap">
            <div className="current-products">
                <div className='your-path'>
                    <div className="path-link" onClick={() => history.push('/store')}>Store</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className='your-link'>My Products</div>
                </div>
                <h1>My Products</h1>
                <div className="current-products-preview">
                    <div className="current-products-list">
                        {Object.values(favorites).map((favorite) => {
                            return (
                                <ProductPreview
                                    key={favorite.Product.id}
                                    product={favorite.Product}
                                />
                            )
                        })}
                        <button id='new-product' onClick={() => history.push('/store/products/new')}>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListPage;
