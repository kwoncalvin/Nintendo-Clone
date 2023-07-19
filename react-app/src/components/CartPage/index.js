import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import CartItem from "./cartItem";

import { getCurrentCartItems } from "../../store/cart_items";

import './CartPage.css'


const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const cartItems = useSelector((state) => state.cartItems.currentItems)

    useEffect(() => {
        dispatch(getCurrentCartItems());
    }, [dispatch])

    return (
        <div id='cart-page-wrapper' className="dodge-nav">
            <div id='cart-page-body'>
                <h2>Shopping cart</h2>
                <div>
                    <div>Home</div>
                    <div>{'>'}</div>
                    <div>My Nintendo Store</div>
                    <div>{'>'}</div>
                    <div>Shopping cart</div>
                </div>
                <div className="cart-content">
                    <div className="cart-items-list">
                        {Object.values(cartItems).map((cartItem) => {
                            return (
                                <CartItem
                                    key={cartItem.id}
                                    cartItem={cartItem}
                                />
                            )
                        })}
                    </div>
                    <div className="order-summary">
                        <h3>Order summary</h3>
                        <h4>Promotional code</h4>
                        <div>
                            <h4>Item(s) subtotal</h4>
                            <h4>Price</h4>
                        </div>
                        <div>
                            <h4>Shipping</h4>
                            <h4>Free</h4>
                        </div>
                        <div>
                            <h4>Estimated tax</h4>
                            <h4>Free</h4>
                        </div>
                        <div>
                            <h3>Estimated total</h3>
                            <h3>Price</h3>
                        </div>
                        <button>Checkout</button>
                        <div>
                            <div>Payment methods</div>
                            <div>
                                <button>Visa</button>
                                <button>Mastercard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
