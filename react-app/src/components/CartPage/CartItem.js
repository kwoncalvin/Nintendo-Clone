import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { putCartItem, deleteCartItem} from "../../store/cart_items";

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const product = cartItem.Product;


    const increase = async (e) => {
        e.preventDefault();

        let payload = {
            'quantity': cartItem.quantity + 1
        }

        await dispatch(putCartItem(payload, cartItem.id))
    }

    const decrease = async (e) => {
        e.preventDefault();

        let payload = {
            'quantity': cartItem.quantity - 1
        }

        await dispatch(putCartItem(payload, cartItem.id))
    }

    const remove = async (e) => {
        dispatch(deleteCartItem(cartItem.id));
    }

    return (
        <div className="cart-item-wrapper">
            <div className="cart-item-first-half">
                <div className="cart-item-img" onClick={() => history.push(`/store/products/${product.id}`)}>
                    <img src={product.imageUrl}/>
                </div>
                <div className="cart-item-name">
                    <h4 onClick={() => history.push(`/store/products/${product.id}`)}>{product.name}</h4>
                </div>
            </div>
            <div className="cart-item-second-half">
                <div className="cart-item-quantity">
                    <p>Quantity</p>
                    <div className="ct-quantity-box">
                        <button onClick={decrease} disabled={cartItem.quantity == 1}>
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        {cartItem.quantity}
                        <button onClick={increase} disabled={cartItem.quantity == 10}>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="cart-item-price">
                    <div>${(product.price * cartItem.quantity).toFixed(2)}</div>
                    <button onClick={remove}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
