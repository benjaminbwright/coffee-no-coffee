import React from 'react';
import axios from 'axios';
import coffeecup from './big-cup.svg';
import './App.scss';

class App extends React.Component {

  state = {
    lastCoffeeStatus: {
      timeSinceCoffeeCheck: 0,
      coffeePresent: null
    },
    coffeeOdds: 50,
    loading: true
  }

  // Handle click event for the coffee is full icon.
  coffeeFullClick = () => {
    console.log(`Yay! There's coffee.`);
    this.recordCoffeeStatus(true);
    this.getLastCoffeeStatus();
  }

  // Handle click event for when the coffee is empty.
  coffeeEmptyClick = () => {
    console.log(`There's no coffee. Come back later`);
    this.recordCoffeeStatus(false);
    this.getLastCoffeeStatus();
  }

  // record the coffee status
  recordCoffeeStatus = (coffeePresent) => {
    // log coffee status to the api
    axios.post(`/api/v1/coffeeStatus/${coffeePresent}`)
      .then(function(){
        console.log("you just logged some coffee!!!");
      });
  }

  getLastCoffeeStatus = () => {
    // Get the coffee status from the api
    axios.get(`/api/v1/coffeeStatus/last`)
      .then(function(status){
        const coffeeStatus = status.data;
        // Get the current time & find the time interval since the last coffee status update
        const now = new Date();
        const coffeeStatusTime = new Date(coffeeStatus.coffeeStatusTime);
        const timeSinceCoffeeCheck = new Date(now - coffeeStatusTime);
        // Return the coffee status and the elapsed time since the latest update
        const currentStatus = {
          lastCoffeeStatus: {
            timeSinceCoffeeCheck: timeSinceCoffeeCheck.getMinutes(),
            coffeePresent: coffeeStatus.coffeePresent
          },
          loading: false
        };
        return currentStatus;
      })
      .then((currentStatus) => {
        // console.log(currentStatus);
        this.setState(currentStatus)
      });
  }

  // get the coffee odds
  getCoffeeOdds = () => {
    // this is a prediction number that will be pulled from a prediction API
    const predictionNumber = 50;
    // time in minutes since the last time a coffee button was clicked
    // this will be based on the timestamp from the last coffee status update
    const coffeeStatus = this.state.lastCoffeeStatus;
    // Set initial value since last check
    let timeSinceCoffeeCheck = 0;
    timeSinceCoffeeCheck = coffeeStatus.timeSinceCoffeeCheck;
    // time interval in minutes to return to the predicted number
    const adjustmentInterval = 25;
    // initialize coffeOdds variable
    let coffeeOdds = predictionNumber;
    if (coffeeStatus.coffeePresent && timeSinceCoffeeCheck < adjustmentInterval) {
      // offset from predictionNumber
      const offset = (100 - predictionNumber) * (1 - (timeSinceCoffeeCheck/adjustmentInterval));
      coffeeOdds = predictionNumber + offset;
    } else if (!coffeeStatus.coffeePresent && timeSinceCoffeeCheck < adjustmentInterval) {
      // offset from predictionNumber
      const offset = predictionNumber * (1 - (timeSinceCoffeeCheck/adjustmentInterval));
      coffeeOdds = predictionNumber - offset;
    }

    return coffeeOdds;
  }

  componentDidMount() {
    // set the new coffee odds in the state and stop loading
    setInterval(() => {
      let coffeeOdds = this.getCoffeeOdds();
      this.getLastCoffeeStatus();
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
        <div id="footer-message">Is there any coffee left?</div>
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
