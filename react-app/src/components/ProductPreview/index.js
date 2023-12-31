import React, { useEffect } from "react";
import { useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import './ProductPreview.css'
import { deleteFavorite, postFavorite } from "../../store/favorites";

const ProductPreview = ({product}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const favorites = useSelector((state) => state.favorites.currentFavorites)
    let date;
    if (product.releaseDate) {
        date = new Date(product.releaseDate)
        date = date.toLocaleDateString("en-US");
    }

    let favorite = Object.values(favorites).filter((favorite) => favorite.user_id == user.id && favorite.product_id == product.id);

    const categoryDict = {
        'game': {
            'category' : 'Twintendo Switch',
            'path' : 'Games',
            'border' : '3px solid rgb(230, 0, 18)',
        },
        'hardware': {
            'category' : 'Hardware',
            'path' : 'Hardware',
            'border' : '3px solid rgb(114, 114, 114)'
        },
        'merchandise': {
            'category' : 'Merchandise',
            'path' : 'Merchandise',
            'border' : '3px solid #3946a0'
        },
    }

    const thisDict = categoryDict[product.category]

    const handleFavorite = e => {
        e.stopPropagation();

        if (!user) {
            history.push('/login')
        }
        let payload = {
            'product_id': product.id
        }

        dispatch(postFavorite(payload))
    }

    const removeFavorite = e => {
        e.stopPropagation();

        if (!user) {
            history.push('/login')
        }

        dispatch(deleteFavorite(favorite[0].id));
    }


    return (
        <div
            class='product-preview-wrapper'
            onClick={() => history.push(`/store/products/${product.id}`)}
        >
            <img src={product.imageUrl || '/logo.png'}/>
            <div className="preview-content">
                <div>
                    <h4>{product.name}</h4>
                    <p>{date}</p>
                </div>
                <div>
                    <h4>${product.price}</h4>
                    <div className="category-fav">
                        <div className="category-line" style={{'border-left': thisDict.border}}>{thisDict.category}</div>
                        {favorite.length > 0 ?
                            <i class="fa-solid fa-heart" onClick={removeFavorite}></i> :
                            <i class="fa-regular fa-heart" onClick={handleFavorite}></i>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview;
