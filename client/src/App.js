import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coffee No Coffee</h1>
      </header>
      <div id="coffee-prediction">
        <h2>Chances of Coffee Right Now</h2>
        <div id="coffee-odds">
          50% Chance of Coffee
        </div>
      </div>
      <div id="footer-interface">
        <div id="coffee-buttons">
          <button>Coffee</button> | 
          <button>No Coffee</button>
        </div>
      </div>
    </div>
  );
}

export default App;
