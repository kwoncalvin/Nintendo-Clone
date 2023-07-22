import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getProduct } from "../../store/products";
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteModal";
import AddToCart from './AddToCart'


import './ProductPage.css'


const ProductPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const productId = params.productId;

    const [quantity, setQuantity] = useState(1);

    const product = useSelector((state) => {
        if (productId == state.products.singleProduct.id)
            return state.products.singleProduct;
        return {}
    })

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch, productId])



    return (
        <div className="product-page-wrapper dodge-nav">
            <div className="product-box">
                <div className="product-path">
                    <div>Store</div>
                    <div>{'>'}</div>
                    <div>Games</div>
                    <div>{'>'}</div>
                    <div>{product.name}</div>
                </div>
                <div className="product-content">
                    <div className="product-img">
                        <img src={product.imageUrl}/>
                    </div>
                    <div>
                        <div>Twintendo Switch</div>
                        <div>{product.name}</div>
                        <div>Price</div>
                        <div>
                            <div>
                                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity == 1}>-</button>
                                {quantity}
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <AddToCart product={product} quantity={quantity}/>
                        </div>
                        <button onClick={() => history.push(`/store/products/${productId}/edit`)}>Edit</button>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                                <DeleteModal productId={productId} />
                            }
                        ></OpenModalButton>
                    </div>
                </div>
            </div>
            <div className='product-bottom-section'>
                <div className="product-description">
                    <h3>{product.descriptionHeader}</h3>
                    <div>{product.description}</div>
                </div>
                <div className='product-desc-img'>
                    <img src={product.imageUrl}/>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
