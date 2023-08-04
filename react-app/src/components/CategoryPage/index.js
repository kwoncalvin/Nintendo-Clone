import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getAllProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

import './CategoryPage.css'

const CategoryPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const products = useSelector((state) => state.products.allProducts)
    const categoryDict = {
        'games' : {
            'filter': 'game',
            'title': 'Games',
            'description': 'Buy digital games here and download them directly to your Twintendo Switch™ system (no code required)! Plus, shop physical games, sales, new releases, and more.',
            'background': "url(https://media.discordapp.net/attachments/1128785113287753760/1136951937057685524/Landing_Page_Header_BG_3600x800.png)",
            'imageUrl': 'https://media.discordapp.net/attachments/1128785113287753760/1136951397867323482/Character_Key_Art_2400x1200.png'
        },
        'hardware' : {
            'filter': 'hardware',
            'title': 'Hardware',
            'description': "Find a Twintendo Switch™ system (or two) that's right for you. Plus, shop for controllers, accessories, and more.",
            'background': 'linear-gradient(rgb(204, 204, 213), rgb(238, 239, 240))',
            'imageUrl': 'https://media.discordapp.net/attachments/1128785113287753760/1136960671750312017/PLP_Hardware_Landing_OLED.png'
        },
        'merchandise' : {
            'filter': 'merchandise',
            'title': 'Merchandise',
            'description': 'Bring home Nintendo fun with apparel and accessories, cool collectibles, decor, and toys.',
            'background': 'linear-gradient(rgb(4, 118, 255), rgb(13, 204, 255))',
            'imageUrl': 'https://media.discordapp.net/attachments/1128785113287753760/1136960992438403082/IS-3238-2400x1200-PLP-Overlay-Merch-ACNH_v02.png'
        },
    }
    const thisDict = categoryDict[params.category]
    const category = thisDict.filter;
    const title = thisDict.title;

    const categoryProducts = Object.values(products).filter((product) => product.category === category);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    return (
        <div className="dodge-nav" id="category-products-wrap">
            <div className="category-banner" style={{'background': thisDict.background}}>
                <div className="category-desc">
                    <h1><i class="fa-solid fa-gamepad"></i> {title}</h1>
                    <h4>{thisDict.description}</h4>
                </div>
                <img src={thisDict.imageUrl}/>
            </div>
            <div className="category-products">
                <div className='category-path'>
                    <div className="path-link" onClick={() => history.push('/store')}>Store</div>
                    <i class="fa-solid fa-greater-than"></i>
                    <div className='category-link'>{title}</div>
                </div>
                <div className="category-products-preview">
                    <div className="category-products-list">
                        {Object.values(categoryProducts).map((product) => {
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

export default CategoryPage;
