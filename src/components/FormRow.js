import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';

const FormRow = ({ setError, inputField, handleRemoveFields, setInputFields, inputFields }) => {
    const [isValidUser, setIsValidUser] = useState(false)
    const [isStrongPass, setIsStrongPass] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPhone, setIsValidPhone] = useState(false)

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(inputField => {
            if (id === inputField.id) {
                let fieldName = event.target.name;
                let value = event.target.value;
                inputField[fieldName] = value;
                if (fieldName === 'username') {
                    const userRegex = /^[a-z0-9_.]+$/;
                    const valid = userRegex.test(value)
                    if (valid) {
                        setIsValidUser(true)
                    } else {
                        setIsValidUser(false)
                    }
                } else if (fieldName === 'password') {
                    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

                    const valid = passRegex.test(value)
                    if (valid) {
                        setIsStrongPass(true)
                    } else {
                        setIsStrongPass(false)
                    }

                } else if (fieldName === 'phone') {
                    const phoneRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
                    const valid = phoneRegex.test(value)
                    if (valid) {
                        setIsValidPhone(true)
                    } else {
                        setIsValidPhone(false)
                    }

                } else {
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const valid = emailRegex.test(value)
                    if (valid) {
                        setIsValidEmail(true)
                    } else {
                        setIsValidEmail(false)
                    }
                }
            }
            return inputField;
        })

        setInputFields(newInputFields);
    }

    useEffect(() => {
        if (!isValidUser || !isStrongPass || !isValidEmail || !isValidPhone) {
            setError(true)
        } else {
            setError(false)
        }
    }, [isValidUser, isStrongPass, isValidEmail, isValidPhone])

    return (
        <div
            className='flex items-center gap-3 mt-4'>
            <div className='flex gap-10'>
                <input name='username' type="text" placeholder="username" className={`px-4 bg-bg py-3 focus:outline-primary border-primary border-2 rounded ${isValidUser ? 'focus:outline-success border-success' : 'focus:outline-error border-error'}`} onChange={e => handleChangeInput(inputField.id, e)} />

                <input name='password' type="password" placeholder="password" className={`px-4 bg-bg py-3 focus:outline-primary border-primary border-2 rounded ${!isStrongPass ? 'focus:outline-error border-error' : 'focus:outline-success border-success'}`} onChange={e => handleChangeInput(inputField.id, e)} />

                <input name='phone' type="tel" placeholder="Phone" className={`px-4 bg-bg py-3 focus:outline-primary border-primary border-2 rounded ${isValidPhone ? 'focus:outline-success border-success' : 'focus:outline-error border-error'}`} onChange={e => handleChangeInput(inputField.id, e)} />

                <input name='email' type="email" placeholder="Email" className={`px-4 bg-bg py-3 focus:outline-primary border-primary border-2 rounded ${isValidEmail ? 'focus:outline-success border-success' : 'focus:outline-error border-error'}`} onChange={e => handleChangeInput(inputField.id, e)} />
            </div>
            <button onClick={(e) => handleRemoveFields(inputField.id, e)}><MdCancel className='text-3xl' /></button>
        </div>
    );
};

export default FormRow;