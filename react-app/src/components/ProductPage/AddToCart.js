import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postCartItem, putCartItem } from "../../store/cart_items";

import './ProductPage.css'

function AddToCart({ product, quantity }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user)
  const cartItems = useSelector((state) => state.cartItems.currentItems)

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      history.push('/login')
    }

    let cartItem = Object.values(cartItems).filter((cartItem) => cartItem.user_id == user.id && cartItem.product_id == product.id);
    let res;
    if (cartItem.length > 0) {
      let qty = cartItem[0].quantity + quantity
      qty = (qty > 10 ? 10 : qty)
      let payload = {
        'quantity': qty
      }
      res = await dispatch(putCartItem(payload, cartItem[0].id))

    } else {
      let payload = {
          'product_id': product.id,
          'quantity': quantity
      }
      res = await dispatch(postCartItem(payload))
    }

    if (res) {
        setShowMenu(true)
    }
}


  const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");
  const body = document.querySelector("body")
  if (showMenu) body.style.overflow = 'hidden'
  else body.style.overflow = 'auto'
  const backClassName = "cart-grey-back" + (showMenu ? "" : " hidden");

  const closeMenu = () => setShowMenu(false);

  return (
    <>
        <button className='add-to-cart-button' onClick={handleSubmit}>
          <i class="fa-solid fa-cart-shopping"></i>
          <div>Add to cart</div>
        </button>

        <div className={backClassName}>
                <ul className={ulClassName} ref={ulRef}>
                    <div>
                    <div className="right-modal-header">
                        <h2>Added to Cart</h2>
                        <i class="fa-solid fa-circle-xmark" onClick={closeMenu}></i>
                    </div>
                    <div className="cart-modal-info">
                        <div id='cart-modal-box'>
                            <img src={product.imageUrl ? product.imageUrl : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg'}/>
                        </div>
                        <div id='cart-modal-item'>
                            <h4>{product.name}</h4>
                            <div id='modal-qty-price'>
                                <div>Qty: {quantity}</div>
                                <div>Price</div>
                            </div>
                        </div>
                        <button id='cart-modal-checkout' onClick={() => history.push('/cart')}>View cart and checkout</button>
                        <button id='continue-shopping' onClick={closeMenu}>Continue shopping</button>
                    </div>
                    </div>
                </ul>
        </div>
    </>
  );
}

export default AddToCart;
