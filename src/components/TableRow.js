import React from 'react';

const TableRow = ({ user, handleChecked }) => {
    return (
        <tr>
            <td className='flex justify-center ml-[-1px] h-8 border-2 border-bg'><input type="checkbox" onChange={(e) => handleChecked(user.id, e)} checked={user.checked} /></td>
            <td className='border-2 border-bg'>{user.username}</td>
            <td className='border-2 border-bg'>{user.password}</td>
            <td className='border-2 border-bg'>{user.phone}</td>
            <td className='border-2 border-bg'>{user.email}</td>
        </tr>
    );
};

export default TableRow;