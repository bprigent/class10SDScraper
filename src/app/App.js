import React from 'react';
import './App.css';
import { useSelector } from "react-redux";
import Nav from '../components/Nav';
import Add from '../components/Add';

function App() {

  return (
    <div className="app_w">
      <Nav />
      <Add />
    </div>
  );
}

export default App;
