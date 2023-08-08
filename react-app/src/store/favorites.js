const POST_FAVORITE = '/favorites/POST';
const GET_CURRENT_FAVORITES = '/favorites/GET/current';
const DELETE_FAVORITE = '/favorites/DELETE';
const CLEAR_FAVORITES = '/favorites/clear';

const favoritePOST = (favorite) => ({
	type: POST_FAVORITE,
	favorite
});

const currentFavoritesGET = (favorites) => ({
	type: GET_CURRENT_FAVORITES,
	favorites
});

const favoriteDELETE = (id) => ({
	type: DELETE_FAVORITE,
	id
});

const favoritesCLEAR = () => ({
	type: CLEAR_FAVORITES
});

const initialState = {
    currentFavorites: {}
};

export const postFavorite = (favorite) => async (dispatch) => {
    const res = await fetch("/api/favorites/add", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(favorite)
    });

    if (res.ok) {
        const data = await res.json();
		const favorite = data.favorite
        dispatch(favoritePOST(favorite));
        return favorite;
    }
}

export const getCurrentFavorites = () => async (dispatch) => {
	const res = await fetch("/api/favorites");
    if (res.ok) {
        const data = await res.json();
        const favorites = data.favorites;
        dispatch(currentFavoritesGET(favorites));
    }
}

export const getFavorite = (productId) => async () => {
    return await fetch(`/api/favorites/${productId}`)
}


export const deleteFavorite = (id) => async (dispatch) => {
	const res = await fetch(`/api/favorites/${id}/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(favoriteDELETE(id));
    }
}

export const clearFavorites = () => async (dispatch) => {
	const res = await fetch(`/api/favorites/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(favoritesCLEAR());
    }
}

const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_FAVORITE:
			return {
				...state,
				currentFavorites: {
					...state.currentFavorites,
					[action.favorite.id]: action.favorite
				}
			}
		case GET_CURRENT_FAVORITES:
			return {
				...state,
				currentFavorites: action.favorites
			}
		case DELETE_FAVORITE:
			let res = {
				...state,
				currentFavorites: { ...state.currentFavorites},
			}
			delete res.currentFavorites[action.id]
			return res
        case CLEAR_FAVORITES:
            return {
                currentFavorites: {}
            }
		default:
			return state;
	}
}

export default favoritesReducer;
