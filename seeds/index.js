const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
            author: '60f981a2a5333b18a4524c5a',
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
                },
                {
                    url: 'https://res.cloudinary.com/dvvroi2xd/image/upload/v1627206366/YelpCamp/wmek034vzq2aw5mowlyr.jpg',
                    filename: 'YelpCamp/wmek034vzq2aw5mowlyr'
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