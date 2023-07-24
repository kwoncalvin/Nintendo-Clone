import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCurrentProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

import './ManageProductsPage.css'

const ManageProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector((state) => state.products.currentProducts)

    useEffect(() => {
        dispatch(getCurrentProducts());
    }, [dispatch])

    return (
        <div className="dodge-nav" id="current-products-wrap">
            <div className="current-products">
                <h1>Your Products</h1>
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
    )
}

export default ManageProductsPage;
