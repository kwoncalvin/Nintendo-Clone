import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getProduct } from "../../store/products";
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteModal";


const ProductPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const productId = params.productId;

    const [quantity, setQuantity] = useState(1);

    const product = useSelector((state) => {
        if (productId == state.products.singleProduct.id)
            return state.products.singleProduct;
        return {}
    })

    useEffect(() => {
        dispatch(getProduct(productId));
    }, [dispatch, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();


    }



    return (
        <div>
            <div>
                <div>
                    <div>Store</div>
                    <div>{'>'}</div>
                    <div>Games</div>
                    <div>{'>'}</div>
                    <div>{product.name}</div>
                </div>
                <div>
                    <img src={product.imageUrl}/>
                    <div>
                        <div>Twintendo Switch</div>
                        <div>{product.name}</div>
                        <div>Price</div>
                        <div>
                            <div>
                                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity == 1}>-</button>
                                {quantity}
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                        <button onClick={() => history.push(`/store/products/${productId}/edit`)}>Edit</button>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                                <DeleteModal productId={productId} />
                            }
                        ></OpenModalButton>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>{product.descriptionHeader}</div>
                    <div>{product.description}</div>
                </div>
                <img src={product.imageUrl}/>
            </div>
        </div>
    )
}

export default ProductPage;
