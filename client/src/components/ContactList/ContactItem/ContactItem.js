import React from 'react';
import { NavLink } from "react-router-dom";
import { fetchDetailsContact } from "../../../store/contactSlice";
import { useDispatch } from "react-redux";

const ContactItem = ({ contact }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <li className="contact__item">
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
        </div>
    );
};

export default ContactItem;