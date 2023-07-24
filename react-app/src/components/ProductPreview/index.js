import { useHistory } from "react-router-dom"

import './ProductPreview.css'

const ProductPreview = ({product}) => {
    const history = useHistory();
    let date;
    if (product.releaseDate) {
        date = new Date(product.releaseDate)
        date = date.toLocaleDateString("en-US");
    }

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
                    <div className="category-line" style={{'border-left': thisDict.border}}>{thisDict.category}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview;
