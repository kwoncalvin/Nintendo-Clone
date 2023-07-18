const POST_PRODUCT = "/products/POST";
const GET_ALL_PRODUCTS = "/products/GET/all"
const GET_CURRENT_PRODUCTS = "/products/GET/current"
const GET_PRODUCT = "/products/GET/single"
const DELETE_PRODUCT = "/products/DELETE";

const productPOST = (product) => ({
	type: POST_PRODUCT,
	product
});

const allProductsGET = (products) => ({
	type: GET_ALL_PRODUCTS,
	products
});

const currentProductsGET = (products) => ({
	type: GET_CURRENT_PRODUCTS,
	products
});

const productGET = (product) => ({
	type: GET_PRODUCT,
	product
});

const productDELETE = (id) => ({
	type: DELETE_PRODUCT,
	id
});

const initialState = {
	singleProduct: {},
	currentProducts: {},
	allProducts: {}
};


export const postProduct = (product) => async (dispatch) => {
	const res = await fetch("/api/products/new", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(product)
    });

    if (res.ok) {
        const data = await res.json();
		const product = data.new_product
        dispatch(productPOST(product));
        return product;
    }
}

export const getAllProducts = () => async (dispatch) => {
	const res = await fetch("/api/products");
    if (res.ok) {
        const data = await res.json();
        const products = data.all_products;
        dispatch(allProductsGET(products));
    }
}

export const getCurrentProducts = () => async (dispatch) => {
	const res = await fetch("/api/products/current");
    if (res.ok) {
        const data = await res.json();
        const products = data.current_products;
        dispatch(currentProductsGET(products));
    }
}

export const getProduct = (id) => async (dispatch) => {
	const res = await fetch(`/api/products/${id}`);
    if (res.ok) {
        const data = await res.json();
		const product = data.single_product;
        dispatch(productGET(product));
    }
}

export const putProduct = (product, id) => async (dispatch) => {
	const res = await fetch(`/api/products/${id}/update`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(product)
    });

    if (res.ok) {
        const data = await res.json();
		const product = data.updated_product;
        dispatch(productPOST(product));
        return product;
    }
}

export const deleteProduct = (id) => async (dispatch) => {
	const res = await fetch(`/api/products/${id}/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(productDELETE(id));
    }
}


const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_PRODUCT:
			return {
				...state,
				allProducts: {
					...state.allProducts,
					[action.product.id]: action.product
				}
			}
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.products
			};
		case GET_CURRENT_PRODUCTS:
			return {
				...state,
				currentProducts: action.products
			}
		case GET_PRODUCT:
			return {
				...state,
				singleProduct: action.product
			};
		case DELETE_PRODUCT:
			let res = {
				...state,
				allProducts: { ...state.allProducts},
				currentProducts: { ...state.currentProducts},
				singleProduct: {}
			}
			delete res.allProducts[action.id]
			delete res.currentProducts[action.id]
			return res
		default:
			return state;
	}
}

export default productsReducer;
