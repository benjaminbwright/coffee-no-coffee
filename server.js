const express = require("express");
const mongoose = require("mongoose");

const app = express();
const ROUTE = 4000;

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/coffeenocoffeedb", { useNewUrlParser: true });

const CoffeeStatus = mongoose.model('CoffeeStatus', {
    coffeePresent: Boolean, 
    coffeeStatusTime: { 
      type: Date, 
      default: Date.now 
    }
});

// the index route 
// expect this route only to deliver dead air since it should not be publicly viewable
app.get("/", (req, res) => {res.send("Yo")});

app.post("/api/v1/coffeeStatus/:coffeePresent", (req, res) => {
  // get a time stamp using Date
  const coffeeStatusTime = new Date().getTime();
  // Get coffee presence
  const coffeePresent = req.params.coffeePresent;
  // add time stamp and coffee status into an object an put it in the mongodb
  const coffeeStatus = new CoffeeStatus({
    coffeePresent,
    coffeeStatusTime
  });

  coffeeStatus.save()
    .then(function() {
      res.send("You just updated the coffee status!!! Is there coffee? "+req.params.coffeePresent);
    });
});

// TODO: add a general route the redirects all unauthorized to a 404 or something similar

app.listen(ROUTE, () => console.log(`Your server is running on route ${ROUTE}`));