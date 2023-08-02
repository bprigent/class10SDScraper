import React from 'react';
import './App.css';
import Nav from '../components/Nav';
import Add from '../components/Add';
import Error404 from '../components/404';
import Domain from '../features/domains/domains';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <div className="app_w">
      <Nav />
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path='*' element={<Navigate to='/Error404' />} />
        <Route path='/' element={<Navigate to='/add' />} />
        <Route path='/:slugPath' element={<Domain />} />
      </Routes>
    </div>
  );
}

export default App;
