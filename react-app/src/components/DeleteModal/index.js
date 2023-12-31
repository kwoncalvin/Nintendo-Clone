import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "../../store/products";

import './DeleteModal.css'

export default function DeleteModal({productId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const deleteItem = async () => {
        dispatch(deleteProduct(productId));
        history.push("/current/products")
        closeModal();
    }

    return (
        <div className="modal-wrap">
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to remove this product?</h4>
            <button className='red-button' onClick={deleteItem}>
                Yes (Delete Product)
            </button>
            <button className='white-button' onClick={closeModal}>
                No (Keep Product)
            </button>
        </div>
    )
}
