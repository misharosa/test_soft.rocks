import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./ContactList.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsContact } from "../../store/contactSlice";

export const ContactList = () => {
    const { contacts } = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    return (
        <>
                <ul className="contact__list">
            {contacts.map(contact => (
                    <li key={contact.id} className="contact__item">
                        <p>{contact.name}</p>
                        <p>{contact.username}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                        <div className="contact__button">
                            <Link className="nav-link" to={`/details/${contact.id}`} onClick={() => dispatch(fetchDetailsContact(contact))}>Details</Link>
                        </div>
                    </li>
                ))}
                </ul>
        </>
    )
}