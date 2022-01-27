import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://mate.academy/students-api/users';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async ( _ , { rejectWithValue }) => {
        try {
            const { data } = await axios(`${USERS_URL}`)

            return data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchDetailsContact = createAsyncThunk(
    'contacts/fetchDetailsContact',
    async (id , {rejectedWithValue, dispatch}) => {
        try {
            dispatch(detailsContact(id))
            await axios.get(`${USERS_URL}/${id.id}`)
        } catch (error) {
            rejectedWithValue(error.message)
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, {rejectedWithValue, dispatch}) => {
        try {
            dispatch(removeContact(id))
           await axios.delete(`${USERS_URL}/${id}`)
        } catch (e) {
            rejectedWithValue(e.message)
        }
    }
)

export const sendNewContact = createAsyncThunk(
    'contacts/sendNewContact',
    async (newContact, {rejectedWithValue, dispatch}) => {
        try {
            dispatch(addContact(newContact))
            await axios.post(`${USERS_URL}`, newContact)
        } catch (e) {
            rejectedWithValue(e.message)
        }
    }
)

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async (editContactObj, {rejectedWithValue, dispatch}) => {
        try {
        dispatch(editContact(editContactObj))
        await axios.put(`${USERS_URL}/${editContactObj.id}`, editContact)
        } catch (error) {
            rejectedWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}

const contactSlice = createSlice({
    name: "contacts",

    initialState: {
        contacts: [],
        details: {},
        status: null,
        error: null,
    },

    reducers: {
        addContact (state, action) {
            state.contacts.push({...action.payload, id: new Date().toISOString()})
        },
        removeContact (state, action) {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
        },
        detailsContact (state, action) {
            state.details = state.contacts.find(contact => contact.id === action.payload.id)
        },
        editContact (state, action) {
            state.contacts = state.contacts.map(contact => {
               return (contact.id === action.payload.id) ? {...contact, ...action.payload} : contact
            })
        }
    },

    extraReducers: {
        [fetchContacts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchContacts.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.contacts = action.payload;
        },
        [fetchContacts.rejected]: setError,
        [fetchDetailsContact.rejected]: setError,
        [deleteContact.rejected]: setError,
    }
})

const { addContact, removeContact, detailsContact, editContact } = contactSlice.actions
export default contactSlice.reducer