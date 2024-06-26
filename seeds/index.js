const axios = require("axios");
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errror:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedImg = async () => {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "VgFKi4CeaL0Bhld66tVXb_vG-TbWsYMxP-pRG-hPEiY",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "661fabfabecb8fdcc58a1ca4",
      location: `${cities[random1000].city} , ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/ddxrmm3wg/image/upload/v1713739400/YelpCamp/yrjq8fyzoadveziyajs9.jpg",
          filename: "YelpCamp/yrjq8fyzoadveziyajs9",
        },
        {
          url: "https://res.cloudinary.com/ddxrmm3wg/image/upload/v1713739538/YelpCamp/ysft5cxb4jwyt33ysji7.webp",
          filename: "YelpCamp/ysft5cxb4jwyt33ysji7",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
