import './App.css';
import { AddContactForm } from "./components/AddContactForm/AddContactForm";
import { useEffect } from "react";
import { ContactList } from "./components/ContactList/ContactList";
import { DetailsContact } from "./components/DetasilsContact/DetailsContact";
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
            <AddContactForm />
            <Routes>
                {contacts.length > 0 &&
                <Route path={`/test_soft.rocks`} element={<ContactList />}>
                </Route>
                }
                <Route path={`/test_soft.rocks/details/${details.id}`} element={<DetailsContact />} />
            </Routes>
        </div>
    </>
  );
}
