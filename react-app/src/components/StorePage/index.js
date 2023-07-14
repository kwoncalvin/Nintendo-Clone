import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../store/products";

const StorePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.allProducts)

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])


    return (
        <div>
            <h2>All Products</h2>
            {
                Object.values(products).map((product) => {
                    return (
                        <dev>
                            hi
                            <h2>{product.name}</h2>
                            <div>{product.description}</div>
                        </dev>
                    )
                })
            }
        </div>
    )
}

export default StorePage;
