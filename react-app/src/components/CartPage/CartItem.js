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
            <div className="cart-item-img">
                <img src={product.imageUrl}/>
            </div>
            <div>
                <h4>{product.name}</h4>
                <div>WishList</div>
            </div>
            <div>
                <div>Quantity</div>
                <div>
                    <button onClick={decrease} disabled={cartItem.quantity == 1}>-</button>
                    {cartItem.quantity}
                    <button onClick={increase} disabled={cartItem.quantity == 1}>+</button>
                </div>
            </div>
            <div>
                <div>${product.price}</div>
                <button onClick={remove}>Remove</button>
            </div>
        </div>
    )
}

export default CartItem;
