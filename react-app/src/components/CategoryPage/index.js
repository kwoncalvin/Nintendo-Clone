import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getAllProducts } from "../../store/products";

import ProductPreview from "../ProductPreview";

import './CategoryPage.css'

const CategoryPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const products = useSelector((state) => state.products.allProducts)
    const categoryDict = {
        'games' : {
            'filter': 'game',
            'title': 'Games'
        },
        'hardware' : {
            'filter': 'hardware',
            'title': 'Hardware'
        },
        'merchandise' : {
            'filter': 'merchandise',
            'title': 'Merchandise'
        },
    }
    const category = categoryDict[params.category].filter;

    const categoryProducts = Object.values(products).filter((product) => product.category === category);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    return (
        <div className="dodge-nav" id="category-products-wrap">
            <div className="category-products">
                <h1>{categoryDict[params.category].title}</h1>
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
    )
}

export default CategoryPage;
