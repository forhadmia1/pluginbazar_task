import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";
import User from './Pages/User';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home
          users={users}
          setUsers={setUsers}
        />} />
        <Route path='/user' element={<User
          users={users}
          setUsers={setUsers}
        />} />
      </Routes>
    </div>
  );
}

export default App;
