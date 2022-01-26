import React from "react";
import { NavLink } from "react-router-dom";
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
                            <NavLink
                                className="nav-link"
                                to={`/test_soft.rocks/details/${contact.id}`}
                                onClick={() => dispatch(fetchDetailsContact(contact))}
                            >
                                Details
                            </NavLink>
                        </div>
                    </li>
                ))}
                </ul>
        </>
    )
}