import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { postProduct, putProduct } from "../../store/products";

import './ProductFormPage.css'

const ProductFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const productId = params.productId;
    const isCreate = !productId;

    const product = useSelector((state) => {
        if (productId == state.products.singleProduct.id)
            return state.products.singleProduct;
        return null;
    })
    let date;
    if (!isCreate) {
        date = new Date(product.releaseDate)
        date = date.toISOString().split('T')[0]
    }
    const [name, setName] = useState(product ? product.name : "");
    const [price, setPrice] = useState(product ? product.price : "");
    const [descriptionHeader, setDescriptionHeader] = useState(product ? product.descriptionHeader : "");
    const [description, setDescription] = useState(product ? product.description : "");
    const [releaseDate, setReleaseDate] = useState(product ? date : "");
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
    const [descImageUrl, setDescImageUrl] = useState(product ? product.descImageUrl : "");
    const [category, setCategory] = useState(product ? product.category : "");
    const [esrb, setEsrb] = useState(product ? product.esrb : "");
    const [color, setColor] = useState(product ? product.color : "");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errs = {};
        if (!name) errs.name = "Name is required";
        else if (name.length > 255) errs.name = "Name must be less than 255 characters long";
        if (!price) errs.price = "Price is required";
        else if (isNaN(price) || Number(price) < 0 || Number(price) > 999.99) {
            errs.price = "Price must be a numeric value between 0.00 and 999.99"
        }
        if (!descriptionHeader) errs.descriptionHeader = "Description header is required";
        else if (descriptionHeader.length > 255) errs.descriptionHeader = "Description header must be less than 255 characters long";
        if (!description) errs.description = "Description is required";
        if (category == 'game' && !releaseDate) errs.releaseDate = "Release date is required for games";
        if (!imageUrl || !(imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg"))) {
            errs.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";
        }
        if (!descImageUrl || !(descImageUrl.endsWith(".png") || descImageUrl.endsWith(".jpg") || descImageUrl.endsWith(".jpeg"))) {
            errs.descImageUrl = "Description image URL must end in .png, .jpg, or .jpeg";
        }
        if (!category) errs.category = "Category is required";
        if (category == 'game' && !esrb) errs.esrb = "ESRB rating is required for games.";


        let payload = {
            'name': name,
            'price': price,
            'description_header': descriptionHeader,
            'description': description,
            'release_date': releaseDate,
            'image_url': imageUrl,
            'desc_image_url': descImageUrl,
            'category': category,
            'esrb': esrb,
            'color': color
        }

        if (errs) {
            setErrors({...errs})
            return;
        } else {
            let product = await dispatch((isCreate? postProduct(payload) : putProduct(payload, productId)))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors({...data.errors, ...errs})
                    }
                });
            if (product) {
                history.push(`/store/products/${product.id}`)
            }
        }
    }
    return (
        <div id='product-form-page-wrapper' className="dodge-nav">
            <h1>Post a Product</h1>
            <div className="product-form-box">
                <form id='product-form' onSubmit={handleSubmit}>
                    <label className="product-input">
                        <div>Name</div>
                        <input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={isCreate ? '' : name}
                        />
                    </label>
                    {errors.name && (
                            <p className="error">{errors.name}</p>
                    )}
                    <label className="product-input">
                        <div>Price</div>
                        <input
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            defaultValue={isCreate ? '' : price}
                        />
                    </label>
                    {errors.price && (
                            <p className="error">{errors.price}</p>
                    )}
                    <label className="product-input">
                        <div>Description Header</div>
                        <input
                            placeholder="Description Header"
                            value={descriptionHeader}
                            onChange={(e) => setDescriptionHeader(e.target.value)}
                            defaultValue={isCreate ? '' : descriptionHeader}
                        />
                    </label>
                    {errors.descriptionHeader && (
                            <p className="error">{errors.descriptionHeader}</p>
                    )}
                    <label className="product-input">
                        <div>Description</div>
                        <input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            defaultValue={isCreate ? '' : description}
                        />
                    </label>
                    {errors.description && (
                            <p className="error">{errors.description}</p>
                    )}
                    <label className="product-input">
                        <div>Image URL</div>
                        <input
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            defaultValue={isCreate ? '' : imageUrl}
                        />
                    </label>
                    {errors.imageUrl && (
                            <p className="error">{errors.imageUrl}</p>
                    )}
                    <label className="product-input">
                        <div>Description Image URL</div>
                        <input
                            placeholder="Description Image URL"
                            value={descImageUrl}
                            onChange={(e) => setDescImageUrl(e.target.value)}
                            defaultValue={isCreate ? '' : descImageUrl}
                        />
                    </label>
                    {errors.descImageUrl && (
                            <p className="error">{errors.descImageUrl}</p>
                    )}
                    <label className="product-input">
                        <div>Color</div>
                        <input
                            type="color"
                            placeholder="Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            defaultValue={isCreate ? '#e9e9e9' : color}
                        />
                    </label>
                    {errors.color && (
                            <p className="error">{errors.color}</p>
                    )}
                    <label className="product-input">
                        <div>Category</div>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            defaultValue={isCreate ? '' : category}
                        >
                            <option value="" hidden>(select one)</option>
                            <option value="game">Game</option>
                            <option value="hardware">Hardware</option>
                            <option value="merchandise">Merchandise</option>
                        </select>
                    </label>
                    {errors.category && (
                        <p className="error">{errors.category}</p>
                    )}
                    {
                        category == 'game' ?
                        (<>
                            <label className="product-input">
                                <div>Release Date</div>
                                <input
                                    type="date"
                                    placeholder="Release Date"
                                    value={releaseDate}
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                    defaultValue={isCreate ? '' : releaseDate}
                                />
                            </label>
                            {errors.releaseDate && (
                                    <p className="error">{errors.releaseDate}</p>
                            )}
                            <label className="product-input">
                                <div>ESRB Rating</div>
                                <select
                                    onChange={(e) => setEsrb(e.target.value)}
                                    defaultValue={isCreate ? '' : esrb}
                                >
                                    <option value="" hidden>(select one)</option>
                                    <option value="everyone">Everyone</option>
                                    <option value="everyone 10+">Everyone 10+</option>
                                    <option value="teen">Teen</option>
                                </select>
                            </label>
                            {errors.esrb && (
                                    <p className="error">{errors.esrb}</p>
                            )}
                        </>) : null

                    }
                    <button className='product-submit' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProductFormPage;
