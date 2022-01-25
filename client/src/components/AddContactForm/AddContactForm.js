import React, { useState } from "react";
import './AddContact.css'
import { useDispatch, useSelector } from "react-redux";
import { sendNewContact } from "../../store/contactSlice";

export const AddContactForm = () => {
    const { contacts } = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [nickName, setNickName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [nameDirty, setNameDirty] = useState(false)
    const [nickNameDirty, setNickNameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)

    const [phoneError, setPhoneError] = useState('Phone cannot be empty')
    const [emailError, setEmailError] = useState('Email cannot be empty')

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                !name.length && setNameDirty(true)
                break
            case 'nick-name':
                !nickName.length && setNickNameDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
        }
    }

    const emailValidation = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('incorrect email')
        } else {
            setEmailError('')
        }
    }

    const phoneValidation = (e) => {
        setPhone(e.target.value)
       const re = /^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/g
        if (!re.test(e.target.value)) {
            setPhoneError('incorrect phone')
        } else {
            setPhoneError('')
        }
    }

    const handleSubmitForm = () => {
        const newContact = {
                email,
                username: nickName,
                phone,
                id: contacts.length + 1,
                name
            }
        dispatch(sendNewContact(newContact))
        setEmail('')
        setPhone('')
        setName('')
        setNickName('')
    }

    return (
        <form
            onSubmit={(e) =>{
                e.preventDefault()
                handleSubmitForm()
            }}
            action=""
            className="form"
        >
            <h1>Add Contact</h1>
            <label htmlFor="">
                {nameDirty && <div className="validation">{'Name cannot be empty'}</div>}
                 <span>Name:</span>
                <input
                    onBlur={e => blurHandler(e)}
                    value={name}
                    onChange={(e) => {
                    setName(e.target.value)
                        if (name.length > 0) {
                            setNameDirty(false)
                        }
                    }}
                    className="form__name form__input"
                    name="name"
                    type="text"
                    placeholder="Enter name..."
                />
            </label>
            <label htmlFor="">
                {nickNameDirty && <div className="validation">{'Nick-name cannot be empty'}</div>}
                Nick :
            <input
                onBlur={e => blurHandler(e)}
                value={nickName}
                onChange={(e) => {
                setNickName(e.target.value)
                    if (nickName.length > 0) {
                        setNickNameDirty(false)
                    }
                }}
                className="form__nickname form__input"
                name="nick-name"
                type="text"
                placeholder="Enter nick-name..."
            />
            </label>
            <label htmlFor="">
                {(phoneDirty && phoneError) && <div className="validation">{phoneError}</div>}
                Phone:
            <input
                onBlur={e => blurHandler(e)}
                value={phone}
                onChange={(e) => phoneValidation(e)}
                className="form__phone form__input"
                name="phone"
                type="text"
                placeholder="+380 XX XXX XX XX"
            />
            </label>
            <label htmlFor="">
                {(emailDirty && emailError) && <div className="validation">{emailError}</div>}
                Email:
            <input
                onBlur={e => blurHandler(e)}
                value={email}
                onChange={(e) => emailValidation(e)}
                className="form__email form__input"
                name="email"
                type="text"
                placeholder="Enter email..."
            />
            </label>
            <button
                title={(!name.length || !nickName.length || !phone.length || !email.length)
                    ? 'enter information'
                    : 'add contact'}
                disabled={!name.length || !nickName.length || !phone.length || !email.length}
                className="form__button"
                type="submit"
            >
                Add
            </button>
        </form>
    )
}
