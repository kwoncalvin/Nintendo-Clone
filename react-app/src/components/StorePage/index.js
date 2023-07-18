import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

const StorePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.allProducts)

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])


    return (
        <div className="dodge-nav">
            <h2>All Products</h2>
            {Object.values(products).map((product) => {
                return (
                    <ProductPreview
                        key={product.id}
                        product={product}
                    />
                )
            })}
        </div>
    )
}

export default StorePage;
