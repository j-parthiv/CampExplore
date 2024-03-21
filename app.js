const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Campground = require('./models/camground');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errror:"));
db.once("open", () => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/campground', async (req, res) => {
    const camp =  new Campground({title: 'My Backyard', description: 'Cheap Camping'})
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
