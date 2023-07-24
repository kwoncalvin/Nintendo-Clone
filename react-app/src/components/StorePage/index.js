import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

import './StorePage.css'

const StorePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector((state) => state.products.allProducts)

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])


    return (
        <div className="dodge-nav">
            <div id='store-background'>
                <div id='red-backing'/>
                <div id='banner-separation'/>
                <img src='https://media.discordapp.net/attachments/1128785113287753760/1132065799759216801/IS-3280-JulyDesignRequests-2880x640-MNS-BackgroundPattern-PIKMIN_v01.png'/>
                <div id="bottom-banner"/>
            </div>
            <div id='store-wrapper'>
                <div id='store-content'>
                    <div id="my-store">
                        <div id='my-twintendo-store'>
                            <img src='https://media.discordapp.net/attachments/1128785113287753760/1132048179433582674/image.png'/>
                            <h1>My Twintendo Store</h1>
                        </div>
                        <div id='random-product'>

                        </div>
                    </div>
                    <div id='categories'>
                        <div className="category-button">
                            <div>Games</div>
                            <img src='https://media.discordapp.net/attachments/1128785113287753760/1132101349547450469/image.png'/>
                        </div>
                        <div className="category-button">
                            <div>Hardware</div>
                            <img src='https://media.discordapp.net/attachments/1128785113287753760/1132108317494354060/image.png'/>
                        </div>
                        <div className="category-button">
                            <div>Merchandise</div>
                            <img src='https://media.discordapp.net/attachments/1128785113287753760/1132108770428846110/image.png'/>
                        </div>
                    </div>
                </div>
            </div>
            <div id='all-products-wrap'>
                <div id='all-products'>
                    <div id='store-path'>
                        <div className="path-link" onClick={() => history.push('/')}>Home</div>
                        <i class="fa-solid fa-greater-than"></i>
                        <div id='store-link'>My Twintendo Store</div>
                    </div>
                    <h1>All Products</h1>
                    <div id='products-list'>
                        {Object.values(products).map((product) => {
                            return (
                                <ProductPreview
                                    key={product.id}
                                    product={product}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorePage;
