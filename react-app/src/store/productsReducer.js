const GET_ALL_PRODUCTS = "/products/GET/all"
const GET_PRODUCT = "/products/GET/single"
const POST_PRODUCT = "/products/POST";
const DELETE_PRODUCT = "/products/DELETE";

const getAllProducts = (products) => ({
	type: GET_ALL_PRODUCTS,
	payload: products
})

const postProduct = (product) => ({
	type: POST_PRODUCT,
	payload: product,
});

const deleteProduct = () => ({
	type: DELETE_PRODUCT,
});

const initialState = {
	singleProduct: {},
	allProducts: {}
};

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, nickname, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			nickname,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.products
			};
		case GET_PRODUCT:
			return {
				...state,
				singleProduct: action.product
			};
		default:
			return state;
	}
}

export default productsReducer;
