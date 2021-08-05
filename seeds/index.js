const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')


mongoose.connect("mongodb+srv://master:bh9jc8L3T6ifRfEq@cluster0.ae3k2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '6106e8029baa580015661494',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvvroi2xd/image/upload/v1627206210/YelpCamp/s4l1quzzulb3urkaddlk.jpg',
                    filename: 'YelpCamp/s4l1quzzulb3urkaddlk'
                }
            ],
            description: 'Spend your day on the water kayaking through the 200 foot sand stone cliffs of the majestic',
            price

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})