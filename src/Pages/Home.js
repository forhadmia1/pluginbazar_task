import React, { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import FormRow from '../components/FormRow';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { useCSVReader } from 'react-papaparse';

const Home = ({ users, setUsers }) => {
    const { CSVReader } = useCSVReader();
    // const buttonRef = useRef(null)
    const [error, setError] = useState(true)
    const navigate = useNavigate()
    const [inputFields, setInputFields] = useState([{ id: uuidv4(), username: '', password: '', phone: '', email: '' }])

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), username: '', password: '', phone: '', email: '' }])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <button onClick={(e) => handleAddFields(e)} className='ml-2'>Add More</button>
                </div>

                <div className='w-full h-[3px] bg-bg'></div>
                <div className='flex justify-end mr-4 mt-4'>
                    <CSVReader
                        onUploadAccepted={(results) => {
                            const datas = results.data
                            const title = results.data[0]
                            datas.shift()
                            const newData = datas.map(data => {
                                const obj = {}
                                title.forEach((d, index) => {
                                    const key = d
                                    const value = data[index];
                                    obj[key] = value
                                })
                                return obj;
                            })
                            setUsers(newData);
                            navigate('/user')
                        }}
                    >
                        {({
                            getRootProps,
                            acceptedFile,
                        }) => (
                            <>
                                <div >
                                    <button type='button' className='text-primary font-bold mt-2 mr-3' {...getRootProps()}>
                                        Browse file
                                    </button>
                                    <div >
                                        {acceptedFile && acceptedFile.name}
                                    </div>
                                </div>
                            </>
                        )}
                    </CSVReader>
                    <input type='submit' value='Submit' className='bg-primary py-2 px-6 rounded' />
                </div>

            </form >
        </div >
    );
};

export default Home;