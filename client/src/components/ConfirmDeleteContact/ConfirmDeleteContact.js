import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./ConfirmDeleteContact.css"
import { deleteContact, updateContact } from "../../store/contactSlice";
import { NavLink } from "react-router-dom";
import Modal from 'react-modal';

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

export const ConfirmDeleteContact = () => {
    const { details } = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false)
    const [name, setName] = useState(details.name)
    const [username, setUserName] = useState(details.username)
    const [phone, setPhone] = useState(details.phone)
    const [email, setEmail] = useState(details.email)

    const handleEdit = () => {
        const editContact = {
            email,
            username,
            phone,
            id: details.id,
            name
        }
        dispatch(updateContact(editContact))
    }

    return (
        <div className="edit-container">
            <div className="details__edit">
                <h1>Details</h1>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
                <input value={username} onChange={(e) => setUserName(e.target.value)} type="text"/>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
                <div className="edit__buttons">
                    <NavLink className="nav-link" to={`/details/${details.id}`} onClick={() => setIsOpen(true)}>delete</NavLink>
                    <NavLink className="nav-link" to={`/details/${details.id}`} onClick={() => handleEdit()}>edit</NavLink>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
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
                        to={`/details/${details.id}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </NavLink>
                </div>
            </Modal>
        </div>
    )
}