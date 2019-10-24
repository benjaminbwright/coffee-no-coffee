const express = require("express");
const mongoose = require("mongoose");

const app = express();
const ROUTE = 4000;

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/coffeenocoffeedb", { useNewUrlParser: true });

// the index route
// expect this route only to deliver dead air since it should not be publicly viewable
app.get("/", (req, res) => {res.send("Yo")});

// TODO: add a general route the redirects all unauthorized to a 404 or something similar

app.listen(ROUTE, () => console.log(`Your server is running on route ${ROUTE}`));