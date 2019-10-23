import React from 'react';
import coffeecup from './big-cup.svg';
import './App.scss';

console.log(coffeecup);

function App() {

  // Handle click event for the coffee is full icon.
  const coffeeFullClick = () => {
    console.log(`Yay! There's coffee.`);
    // make an api call that tracks full coffee in the DB
  }

  // Handle click event for when the coffee is empty.
  const coffeeEmptyClick = () => {
    console.log(`There's no coffee. Come back later.`);
    // make an api call that tracks empty coffee in the DB
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coffee No Coffee</h1>
      </header>
      <div id="coffee-prediction">
        <div id="coffee-odds">
          50%
        </div>
        <h2>Chances of Coffee Right Now</h2>
      </div>
      <div id="footer-interface">
        <div id="coffee-buttons">
          <div className="coffee-button filled-up" onClick={coffeeFullClick}><img src={coffeecup} alt="Coffe Cup"/></div>
          <div className="coffee-button poured-out" onClick={coffeeEmptyClick}><img src={coffeecup} alt="Coffe Cup"/></div>
        </div>
      </div>
    </div>
  );
}

export default App;
