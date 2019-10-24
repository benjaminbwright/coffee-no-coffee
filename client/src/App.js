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

  // get the coffee odds
  getCoffeeOdds = () => {
    const coffeeOdds = this.predictCoffeeOdds();
    return coffeeOdds;
  }

  predictCoffeeOdds = () => {
    // this is a prediction number that will be pulled from a prediction API
    // TODO: add api pull to get prediction number
    const predictionNumber = 50;
    // time in minutes since the last time a coffee button was clicked
    // this will be based on the timestamp from the last coffee check record in the database
    // TODO: write method that grabs the last timestamp for a coffeecheck
    const timeSinceCoffeeCheck = 20;
    // time interval in minutes to return to the predicted number
    const adjustmentInterval = 25;
    // current prediction number adjusted by latest coffee button clicks
    const coffeePresentLastCheck = false;
    // initialize coffeOdds variable
    let coffeeOdds = predictionNumber;
    if (coffeePresentLastCheck && timeSinceCoffeeCheck < adjustmentInterval) {
      // offset from predictionNumber
      const offset = (100 - predictionNumber) * (1 - (timeSinceCoffeeCheck/adjustmentInterval));
      coffeeOdds = predictionNumber + offset;
    } else if (!coffeePresentLastCheck && timeSinceCoffeeCheck < adjustmentInterval) {
      // offset from predictionNumber
      const offset = predictionNumber * (1 - (timeSinceCoffeeCheck/adjustmentInterval));
      coffeeOdds = predictionNumber - offset;
    }

    return coffeeOdds;
  }

  componentDidMount() {
    // get the coffee odds from the api
    const coffeeOdds = this.getCoffeeOdds();
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
