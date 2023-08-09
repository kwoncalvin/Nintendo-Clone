import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCurrentProducts } from "../../store/products";
import { getCurrentFavorites } from "../../store/favorites";

import ProductPreview from "../ProductPreview";

import './ManageProductsPage.css'

const ManageProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector((state) => state.products.currentProducts)

    useEffect(() => {
        dispatch(getCurrentProducts());
        dispatch(getCurrentFavorites());

    }, [dispatch])

    return (
        <div className="dodge-nav" id="current-products-wrap">
            <div className="current-products">
                <div className='your-path'>
                    <div className="path-link" onClick={() => history.push('/store')}>Store</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className='your-link'>My Products</div>
                </div>
                <h1>My Products</h1>
                {Object.values(products).length ? null : <h2>You currently have no products posted.</h2>}
                <div className="current-products-preview">
                    <div className="current-products-list">
                        {Object.values(products).map((product) => {
                            return (
                                <ProductPreview
                                    key={product.id}
                                    product={product}
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

export default ManageProductsPage;
