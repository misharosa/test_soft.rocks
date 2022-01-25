import './App.css';
import { AddContactForm } from "./components/AddContactForm/AddContactForm";
import { useEffect } from "react";
import { ContactList } from "./components/ContactList/ContactList";
import { ConfirmDeleteContact } from "./components/ConfirmDeleteContact/ConfirmDeleteContact";
import { Route, Routes } from "react-router-dom";
import { fetchContacts } from "./store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

export const App = () => {
    const dispatch = useDispatch()
    const { contacts, details } = useSelector(state => state.contacts)

    useEffect( () => {
        dispatch(fetchContacts())
    },[])

  return (
    <>
    <div className="App">
        <div className="page-container">
            <AddContactForm />
        </div>

        <Routes>
        {contacts.length > 0 &&
            <Route path={`/`} element={
                <ContactList />
            }
            />}
            <Route path={`/details/${details.id}`} element={<ConfirmDeleteContact details={details} />} />
        </Routes>
    </div>
    </>
  );
}
