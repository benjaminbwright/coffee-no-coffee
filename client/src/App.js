import React from 'react';
import coffeecup from './big-cup.svg';
import './App.scss';

console.log(coffeecup);

class App extends React.Component {

  state = {
    coffeeOdds: 50,
    loading: true
  }

  // Handle click event for the coffee is full icon.
  coffeeFullClick = () => {
    let coffeeOdds = this.state.coffeeOdds;
    console.log(`Yay! There's coffee.`);
    if (coffeeOdds <= 100) {
      coffeeOdds++;
    }
    this.setState({
      coffeeOdds: coffeeOdds
    })
    // make an api call that tracks full coffee in the DB
  }

  // Handle click event for when the coffee is empty.
  coffeeEmptyClick = () => {
    let coffeeOdds = this.state.coffeeOdds;
    console.log(`There's no coffee. Come back later`);
    if (coffeeOdds >= 0) {
      coffeeOdds--;
    }
    this.setState({
      coffeeOdds: coffeeOdds
    })
    // make an api call that tracks empty coffee in the DB
  }

  getCoffeOdds = () => {
    const coffeeOdds = 25;
    return coffeeOdds;
  }

  componentDidMount() {
    // get the coffee odds from the api
    const coffeeOdds = this.getCoffeOdds();
    // set the new coffee odds in the state and stop loading
    setTimeout(() => {
      this.setState({
        coffeeOdds,
        loading: false
      })
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Coffee No Coffee</h1>
        </header>
        { this.state.loading ? 
          (
            <div id="prediction-loading" className="prediction-section">Loading...</div>
          ) : (
            <div id="coffee-prediction" className="prediction-section">
              <div id="coffee-odds">{this.state.coffeeOdds}%</div>
              <h2>Chance of Coffee</h2>
            </div>
          )
        }
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
