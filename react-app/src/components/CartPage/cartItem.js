import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div>
            <img/>
            <div>
                <h4>Item Title</h4>
                <div>WishList</div>
            </div>
            <div>
                <div>Quantity</div>
                <div>
                    <div>-</div>
                    <div>quantity</div>
                    <div>+</div>
                </div>
            </div>
            <div>
                <div>Cost</div>
                <div>Remove</div>
            </div>
        </div>
    )
}

export default CartItem;
