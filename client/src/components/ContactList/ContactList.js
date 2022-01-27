import React from "react";
import "./ContactList.css"
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem/ContactItem";

export const ContactList = () => {
    const { contacts } = useSelector(state => state.contacts)

    return (
        <>
                <ul className="contact__list">
            {contacts.map(contact => (
                    <ContactItem
                        key={contact.id}
                        contact={contact}
                    />
                ))}
                </ul>
        </>
    )
}