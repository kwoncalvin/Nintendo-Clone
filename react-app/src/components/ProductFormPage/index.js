import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { postProduct, putProduct } from "../../store/products";

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

    const [name, setName] = useState(product ? product.name : "");
    const [descriptionHeader, setDescriptionHeader] = useState(product ? product.descriptionHeader : "");
    const [description, setDescription] = useState(product ? product.description : "");
    const [releaseDate, setReleaseDate] = useState(product ? product.releaseDate : "");
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('**************')
        let errs = {};
        if (!name) errs.name = "Name is required";
        else if (name.length > 255) errs.name = "Name must be less than 255 characters long";
        if (!descriptionHeader) errs.descriptionHeader = "Description header is required";
        else if (descriptionHeader.length > 255) errs.descriptionHeader = "Description header must be less than 255 characters long";
        if (!description) errs.description = "Description is required";
        if (!releaseDate) errs.releaseDate = "Release date is required";
        if (!(imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg"))) {
            errs.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";
        }

        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("description_header", descriptionHeader);
        // formData.append("description", description);
        // formData.append("release_date", releaseDate);
        // formData.append("image_url", imageUrl);

        let payload = {
            name,
            descriptionHeader,
            description,
            releaseDate,
            imageUrl
        }

        if (errs) setErrors({...errs})
        let product = await dispatch((isCreate? postProduct(payload) : putProduct(payload, productId)))
            .catch(async (res) => {
                const data = await res.json();
                console.log("*******************")
                if (data && data.errors) {
                    setErrors({...data.errors, ...errs})
                }
            });
        if (product) {
            history.push(`/store/products/${product.id}`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={isCreate ? '' : name}
                />
                {errors.name && (
                        <p className="error">{errors.name}</p>
                )}
                <input
                    placeholder="Description Header"
                    value={descriptionHeader}
                    onChange={(e) => setDescriptionHeader(e.target.value)}
                    defaultValue={isCreate ? '' : descriptionHeader}
                />
                {errors.descriptionHeader && (
                        <p className="error">{errors.descriptionHeader}</p>
                )}
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={isCreate ? '' : description}
                />
                {errors.description && (
                        <p className="error">{errors.description}</p>
                )}
                <input
                    type="date"
                    placeholder="Release Date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    defaultValue={isCreate ? '' : releaseDate}
                />
                {errors.releaseDate && (
                        <p className="error">{errors.releaseDate}</p>
                )}
                <input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    defaultValue={isCreate ? '' : imageUrl}
                />
                {errors.imageUrl && (
                        <p className="error">{errors.imageUrl}</p>
                )}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProductFormPage;
