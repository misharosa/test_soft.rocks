import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DetailsContact.css"
import { updateContact } from "../../store/contactSlice";
import { NavLink } from "react-router-dom";
import { usePrev } from "../../hooks/usePrev";
import ConfirmModal from "./ConfirmModal/ConfirmModal";

export const DetailsContact = () => {
    const { details } = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const [modalIsOpen, setIsOpen] = useState(false)
    const [modal2IsOpen, setIsOpen2] = useState(false)

    const [name, setName] = useState(details.name)
    const [username, setUserName] = useState(details.username)
    const [phone, setPhone] = useState(details.phone)
    const [email, setEmail] = useState(details.email)

    const prevName = usePrev(details.name)
    const prevSureName = usePrev(details.username)
    const prevPhone = usePrev(details.phone)
    const prevEmail = usePrev(details.email)

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

    const handlePrevValue = () => {
        const cancelEditContact = {
            email: prevEmail,
            username: prevSureName,
            phone: prevPhone,
            id: details.id,
            name: prevName
        }
        setName(prevName)
        setUserName(prevSureName)
        setPhone(prevPhone)
        setEmail(prevEmail)
        dispatch(updateContact(cancelEditContact))
    }

    return (
        <div className="edit-container">
            <div className="details__edit">
                <div className="details_header">
                    <h1>Details</h1>
                    <NavLink to={'/test_soft.rocks'}>
                        <img className="details_header-img" src="https://papik.pro/uploads/posts/2021-12/thumbs/1639305041_21-papik-pro-p-klipart-krestik-21.png" alt="close"/>
                    </NavLink>
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
                <input value={username} onChange={(e) => setUserName(e.target.value)} type="text"/>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
                <div className="edit__buttons">
                    <NavLink className="nav-link" to={`/test_soft.rocks/details/${details.id}`} onClick={() => setIsOpen(true)}>delete</NavLink>
                    <NavLink className="nav-link" to={`/test_soft.rocks/details/${details.id}`} onClick={() => handleEdit()}>confirm edit</NavLink>
                    <NavLink className="nav-link" to={`/test_soft.rocks/details/${details.id}`} onClick={() => setIsOpen2(true)}>cancel edit</NavLink>
                </div>
            </div>
            <ConfirmModal
                handlePrevValue={handlePrevValue}
                modalIsOpen={modalIsOpen}
                modal2IsOpen={modal2IsOpen}
                setIsOpen={setIsOpen}
                setIsOpen2={setIsOpen2}
            />
        </div>
    )
}