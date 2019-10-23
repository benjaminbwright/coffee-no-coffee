import React from 'react';
import coffeecup from './big-cup.svg';
import './App.scss';

console.log(coffeecup);

class App extends React.Component {

  state = {
    coffeeOdds: 25
  }

  // Handle click event for the coffee is full icon.
  coffeeFullClick = () => {
    let coffeeOdds = this.state.coffeeOdds;
    console.log(`Yay! There's coffee.`, coffeeOdds);
    coffeeOdds++;
    this.setState({
      coffeeOdds: coffeeOdds
    })
    // make an api call that tracks full coffee in the DB
  }

  // Handle click event for when the coffee is empty.
  coffeeEmptyClick = () => {
    let coffeeOdds = this.state.coffeeOdds;
    console.log(`There's no coffee. Come back later`);
    coffeeOdds--;
    this.setState({
      coffeeOdds: coffeeOdds
    })
    // make an api call that tracks empty coffee in the DB
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Coffee No Coffee</h1>
        </header>
        <div id="coffee-prediction">
          <div id="coffee-odds">
            { this.state.coffeeOdds }%
          </div>
          <h2>Chance of Coffee</h2>
        </div>
        <div id="footer-interface">
          <div id="coffee-buttons">
            <div className="coffee-button filled-up" onClick={this.coffeeFullClick}><img src={coffeecup} alt="Coffe Cup"/></div>
            <div className="coffee-button poured-out" onClick={this.coffeeEmptyClick}><img src={coffeecup} alt="Coffe Cup"/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
