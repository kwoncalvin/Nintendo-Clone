import { useHistory } from "react-router-dom"

const ProductPreview = ({product}) => {
    const history = useHistory();

    return (
        <div
            onClick={() => history.push(`store/products/${product.id}`)}
        >
            <img src={product.imageUrl || '/logo.png'}/>
            <div>
                <div>
                    <h4>{product.name}</h4>
                    <p>{product.releaseDate}</p>
                </div>
                <div>
                    <div>price</div>
                    <div>category</div>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview;
