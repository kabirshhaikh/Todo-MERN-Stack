import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Todo from './Components/todo';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-task/:userId' element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
