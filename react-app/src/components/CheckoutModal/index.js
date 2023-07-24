import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import './CheckoutModal.css'

export default function CheckoutModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();


    return (
        <div className="modal-wrap">
            <h2>Checkout Successful!</h2>
        </div>
    )
}
