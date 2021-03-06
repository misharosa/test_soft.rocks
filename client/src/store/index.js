import { configureStore, combineReducers } from "@reduxjs/toolkit"
import contactsReducer from "./contactSlice"

const rootReducer = combineReducers({
    contacts: contactsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})