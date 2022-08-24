import React, { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import FormRow from '../components/FormRow';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'

const Home = ({ users, setUsers }) => {
    const [error, setError] = useState(true)
    const navigate = useNavigate()
    const [inputFields, setInputFields] = useState([{ id: uuidv4(), username: '', password: '', phone: '', email: '' }])

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), username: '', password: '', phone: '', email: '' }])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(error)
        if (!error) {
            setUsers([...users, ...inputFields])
            navigate('/user')
        }
    };

    const handleRemoveFields = (id, e) => {
        e.preventDefault()
        if (inputFields.length > 1) {
            const values = [...inputFields];
            values.splice(values.findIndex(value => value.id === id), 1);
            setInputFields(values);
        }
    }


    return (
        <div className='mt-10 px-24'>
            <form onSubmit={handleSubmit}>
                {
                    inputFields.map(inputField =>
                        <FormRow
                            key={inputField?.id}
                            inputField={inputField}
                            handleRemoveFields={handleRemoveFields}
                            inputFields={inputFields}
                            setInputFields={setInputFields}
                            setError={setError}
                        />
                    )
                }
                <div className='mt-5 flex items-center text-primary text-lg font-semibold'>
                    <BsFillPlusCircleFill />
                    <button onClick={handleAddFields} className='ml-2'>Add More</button>
                </div>

                <div className='w-full h-[3px] bg-bg'></div>
                <div className='flex justify-end mr-4 mt-4'>
                    <input value={'Import'} type='file' className='text-primary font-bold' />
                    <input type='file' value='Submit' className='bg-primary py-2 px-6 rounded' />
                </div>

            </form>
        </div>
    );
};

export default Home;