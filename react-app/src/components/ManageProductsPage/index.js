import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCurrentProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

const ManageProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector((state) => state.products.currentProducts)

    useEffect(() => {
        dispatch(getCurrentProducts());
    }, [dispatch])

    return (
        <div>
            <h2>Current Products</h2>
            {Object.values(products).map((product) => {
                return (
                    <ProductPreview
                        key={product.id}
                        product={product}
                    />
                )
            })}
            <button onClick={() => history.push('/store/products/new')}>New Product</button>
        </div>
    )
}

export default ManageProductsPage;
