const POST_CART_ITEM = '/cart_items/POST';
const GET_CURRENT_CART_ITEMS = '/cart_items/GET/current';
const DELETE_CART_ITEM = '/cart_items/DELETE';
const CLEAR_CART = '/cart/clear';

const cartItemPOST = (cartItem) => ({
	type: POST_CART_ITEM,
	cartItem
});

const currentCartItemsGET = (cartItems) => ({
	type: GET_CURRENT_CART_ITEMS,
	cartItems
});

const cartItemDELETE = (id) => ({
	type: DELETE_CART_ITEM,
	id
});

const cartCLEAR = () => ({
	type: CLEAR_CART
});

const initialState = {
    currentItems: {}
};

export const postCartItem = (cartItem) => async (dispatch) => {
    const res = await fetch("/api/cart-items/add", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(cartItem)
    });

    if (res.ok) {
        const data = await res.json();
		const cartItem = data.cart_item
        dispatch(cartItemPOST(cartItem));
        return cartItem;
    }
}

export const getCurrentCartItems = () => async (dispatch) => {
	const res = await fetch("/api/cart-items");
    if (res.ok) {
        const data = await res.json();
        const cartItems = data.cart_items;
        dispatch(currentCartItemsGET(cartItems));
    }
}

// export const getCartItem = (id) => async () => {
//     const res = await fetch(`/api/cart-items/${id}`)
// }

export const putCartItem = (cartItem, id) => async (dispatch) => {
	const res = await fetch(`/api/cart-items/${id}/update`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(cartItem)
    });

    if (res.ok) {
        const data = await res.json();
		const cartItem = data.cart_item;
        dispatch(cartItemPOST(cartItem));
        return cartItem;
    }
}

export const deleteCartItem = (id) => async (dispatch) => {
	const res = await fetch(`/api/cart-items/${id}/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(cartItemDELETE(id));
    }
}

export const clearCart = () => async (dispatch) => {
	const res = await fetch(`/api/cart-items/cart/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(cartCLEAR());
    }
}

const cartItemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_CART_ITEM:
			return {
				...state,
				currentItems: {
					...state.currentItems,
					[action.cartItem.id]: action.cartItem
				}
			}
		case GET_CURRENT_CART_ITEMS:
			return {
				...state,
				currentItems: action.cartItems
			}
		case DELETE_CART_ITEM:
			let res = {
				...state,
				currentItems: { ...state.currentItems},
			}
			delete res.currentItems[action.id]
			return res
        case CLEAR_CART:
            return {
                currentItems: {}
            }
		default:
			return state;
	}
}

export default cartItemsReducer;
