import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import TableRow from '../components/TableRow';
import CsvDownload from 'react-json-to-csv';

const User = ({ users, setUsers }) => {
    const [selectAll, setSelectAll] = useState(false)
    const navigate = useNavigate()

    const hchecked = users.find(user => user.checked === true)

    const handleChecked = (id, e) => {
        if (!e.target.checked) {
            setSelectAll(false)
        }
        const update = users.map(user => {
            if (user.id === id) {
                user['checked'] = e.target.checked
            }
            return user;
        })
        setUsers(update)
    }

    const handleSelectAll = (e) => {
        if (users.length > 0) {
            const update = users.map(user => {
                user['checked'] = e.target.checked
                return user
            })
            setSelectAll(e.target.checked)
            setUsers(update)
        }
    }

    const deleteone = () => {
        const rest = users.filter(user => user.checked !== true)
        setUsers(rest)
    }

    const deleteAll = () => {
        if (selectAll) {
            setSelectAll(false)
            setUsers([])
        }
    }

    return (
        <div className='px-24 mt-4'>
            <div className='flex justify-between'>
                <BiArrowBack onClick={() => navigate('/')} className='font-bold text-2xl bg-bg rounded' />
                <CsvDownload className='bg-primary px-6 py-3 rounded' data={users}>Export</CsvDownload>
            </div>
            <div>
                <table className='w-full mt-5 rounded'>
                    <thead>
                        <tr>
                            <th className='border-2 border-bg'><input type="checkbox" checked={selectAll} onChange={(e) => handleSelectAll(e)} /></th>
                            <th className='border-2 border-bg'>UserName</th>
                            <th className='border-2 border-bg'>Password</th>
                            <th className='border-2 border-bg'>Phone</th>
                            <th className='border-2 border-bg'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <TableRow
                                key={user.id}
                                user={user}
                                handleChecked={handleChecked}
                            />)
                        }
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center'>
                {
                    selectAll ? <button onClick={deleteAll} className={' bg-error rounded px-6 py-3 mt-4'}>Delete All</button> :
                        <button onClick={deleteone} className={hchecked ? 'bg-error rounded px-6 py-3 mt-4' : 'bg-bg rounded px-6 py-3 mt-4'}>Delete</button>
                }
            </div>
        </div>
    );
};

export default User;