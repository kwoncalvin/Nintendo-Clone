import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getProduct } from "../../store/products";
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteModal";
import AddToCart from './AddToCart'


import './ProductPage.css'


const ProductPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const productId = params.productId;

    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.session.user)
    const product = useSelector((state) => {
        if (productId == state.products.singleProduct.id)
            return state.products.singleProduct;
        return {}
    })

    const categoryDict = {
        'game': {
            'category' : 'Twintendo Switch',
            'path' : 'Games',
            'border' : '3px solid rgb(230, 0, 18)',
            'link' : '/store/games',
            'height' : '39rem',
            'everyone' : 'https://media.discordapp.net/attachments/1128785113287753760/1132867904266829846/E.png',
            'everyone 10+' : 'https://media.discordapp.net/attachments/1128785113287753760/1132868172551299182/E10plus.png',
            'teen' : 'https://media.discordapp.net/attachments/1128785113287753760/1132868316936019998/T.png'
        },
        'hardware': {
            'category' : 'Hardware',
            'path' : 'Hardware',
            'border' : '3px solid rgb(114, 114, 114)',
            'link' : '/store/hardware',
            'height' : '35rem'
        },
        'merchandise': {
            'category' : 'Merchandise',
            'path' : 'Merchandise',
            'border' : '3px solid #3946a0',
            'link' : '/store/merchandise',
            'height' : '35rem'
        },
    }

    const thisDict = categoryDict[product.category]

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch, productId])



    if (!thisDict) return null
    return (
        <div className="product-page-wrapper dodge-nav">
            <div className='product-color' style={{'background-color': product.color, 'height': thisDict.height}}>

            </div>
            <div className="product-box">
                <div className="product-path">
                    <div className="path-link" onClick={() => history.push('/store')}>Store</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className="path-link" onClick={() => history.push(thisDict.link)}>{thisDict.path}</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className="product-link">{product.name}</div>
                </div>
                <div className="product-content">
                    <div className="product-img">
                        <img src={product.imageUrl}/>
                    </div>
                    <div className="product-info">
                        <div className="category-line" style={{'border-left': thisDict.border}} >{thisDict.category}</div>
                        <h1>{product.name}</h1>
                        <h2>${product.price}</h2>
                        <div className="add-to-cart-section">
                            <div className="quantity-adjuster">
                                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity == 1}>
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                {quantity}
                                <button onClick={() => setQuantity(quantity + 1)} disabled={quantity == 10}>
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <AddToCart product={product} quantity={quantity}/>
                        </div>
                        {
                            user.id === product.userId ?
                            (<div className="manage-buttons">
                                <button className='product-edit' onClick={() => history.push(`/store/products/${productId}/edit`)}>Edit</button>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={
                                        <DeleteModal productId={productId} />
                                    }
                                ></OpenModalButton>
                            </div>) : null
                        }
                    </div>
                </div>
                {product.category == 'game' ?
                    <img className='esrb' src={thisDict[product.esrb]}/> :
                    null
                }
            </div>
            <div className='product-bottom-section'>
                <div className="product-description">
                    <h3>{product.descriptionHeader}</h3>
                    <div>{product.description}</div>
                </div>
                <div className='product-desc-img'>
                    <img src={product.descImageUrl}/>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
