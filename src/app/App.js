import React from 'react';
import './App.css';
import { useSelector } from "react-redux";
import Nav from '../components/Nav';

function App() {

  return (
    <div className="app_w">
      <Nav />
      <div className='body_w'>
        <p>
          "hello"
        </p>
      </div>
    </div>
  );
}

export default App;
