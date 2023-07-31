import React from 'react';
import './App.css';
import { useSelector } from "react-redux";

function App() {

  const domains = useSelector(state => state.domains.domainsList);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Time to get started!
        </p>
        <p>
          {domains}
        </p>
      </header>
    </div>
  );
}

export default App;
