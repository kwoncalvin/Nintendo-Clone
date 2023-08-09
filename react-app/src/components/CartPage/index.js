import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory } from "react-router-dom";

import CartItem from "./CartItem";

import { getCurrentCartItems, clearCart } from "../../store/cart_items";
import { getCurrentFavorites } from "../../store/favorites";
import OpenModalButton from "../OpenModalButton";
import CheckoutModal from "../CheckoutModal";
import './CartPage.css'


const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const cartItems = useSelector((state) => state.cartItems.currentItems)
    const [promo, setPromo] = useState("");

    let price = 0;
    for (let cartItem of Object.values(cartItems)) {
        price += Number(cartItem.quantity) * Number(cartItem.Product.price)
    }


    useEffect(() => {
        dispatch(getCurrentCartItems());
        dispatch(getCurrentFavorites());
    }, [dispatch])

    const handleClear = () => {
        dispatch(clearCart())
    }

    const handleCheckout = () => {
        dispatch(clearCart())
        history.push('/')
    }

    return (
        <div id='cart-page-wrapper' className="dodge-nav">
            <div id='cart-page-body'>
                <h1>Shopping cart</h1>
                <div className="cart-path">
                    <div className="path-link" onClick={() => history.push('/')}>Home</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className="path-link" onClick={() => history.push('/store')}>My Nintendo Store</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className="cart-link">Shopping cart</div>
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
                        {Object.values(cartItems).length ?
                            <button id='clear-cart-button' onClick={handleClear}>Clear Cart</button> :
                            <h2 style={{'margin': '2rem 0rem'}}>Your Cart is Empty</h2>
                        }
                    </div>
                    <div className="order-summary">
                        <h3 className="bottom-border">Order summary</h3>
                        <div className="space-between order-section bottom-border">
                            <h4>Promotional code</h4>
                            <input onChange={(e) => setPromo(e.target.value)}></input>
                        </div>
                        <div className="space-between order-section">
                            <h4>Item(s) subtotal</h4>
                            <h4>${price.toFixed(2)}</h4>
                        </div>
                        {promo == 'AppAcademy'?
                            (<div className="space-between order-section promo">
                                <h4>99% Off!</h4>
                                <h4>- ${(price * .99).toFixed(2)}</h4>
                            </div>) : null
                        }
                        <div className="space-between order-section bottom-border">
                            <h4>Shipping</h4>
                            <h4>Free</h4>
                        </div>
                        <div className="space-between order-section bottom-border">
                            <h4>Estimated tax</h4>
                            <h4>Free</h4>
                        </div>
                        <div className="space-between order-section">
                            <h3>Estimated total</h3>
                            <h3>${promo == 'AppAcademy'? (price * .01).toFixed(2) : price.toFixed(2)}</h3>
                        </div>
                        {Object.values(cartItems).length ?
                            (<OpenModalButton
                                buttonText="Checkout"
                                modalComponent={<CheckoutModal></CheckoutModal>}
                                onButtonClick={handleCheckout}
                            ></OpenModalButton>) :
                            null
                        }
                        {/* <div id='payment-methods'>
                            <p>Payment methods</p>
                            <div>
                                <button>Visa</button>
                                <button>Mastercard</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
