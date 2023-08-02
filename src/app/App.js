import React from 'react';
import './App.css';
import Nav from '../components/Nav';
import Add from '../components/Add';
import Error404 from '../components/404';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <div className="app_w">
      <Nav />
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/' element={<Navigate to='/add' />} />
      </Routes>
    </div>
  );
}

export default App;
