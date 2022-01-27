import React from 'react';
import Modal from "react-modal";
import { NavLink } from "react-router-dom";
import { deleteContact } from "../../../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ConfirmModal = ({ handlePrevValue, setIsOpen, modal2IsOpen, modalIsOpen, setIsOpen2 }) => {

    const dispatch = useDispatch()
    const { details } = useSelector(state => state.contacts)

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <h4>Are you sure you want to delete?</h4>
                <div className="modal__buttons">
                    <NavLink
                        className="nav-link"
                        to={'/test_soft.rocks'}
                        onClick={() => dispatch(deleteContact(details.id))}
                    >
                        Delete
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to={`/test_soft.rocks/details/${details.id}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </NavLink>
                </div>
            </Modal>
            <Modal
                isOpen={modal2IsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <h4>Are you sure cancel edit?</h4>
                <div className="modal__buttons">
                    <NavLink
                        className="nav-link"
                        to={`/test_soft.rocks/details/${details.id}`}
                        onClick={() => {
                            handlePrevValue()
                            setIsOpen2(false)
                        }}
                    >
                        Yes
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to={`/test_soft.rocks/details/${details.id}`}
                        onClick={() => setIsOpen2(false)}
                    >
                        No
                    </NavLink>
                </div>
            </Modal>
        </div>
    );
};

export default ConfirmModal;