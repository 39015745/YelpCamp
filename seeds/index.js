const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/yelp-camp");
    console.log("Database connected");
}
main().catch(err => console.log(err));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    const price = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < 300; i++) {
        const randomCity = sample(cities);
        const camp = new Campground({
            //YOUR USER ID
            author: '6495e13241b780033422029b',
            location: `${randomCity.city}, ${randomCity.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum possimus ab, dicta quae facilis provident, similique ratione cupiditate maiores voluptatibus minus quis eos fugiat sit hic sed laborum, animi libero.",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    randomCity.longitude,
                    randomCity.latitude,
                ]
            },
            images: [
                {
                    url: "https://source.unsplash.com/collection/483251",
                    filename: 'YelpCamp/sqmgpiygmvoi4ezqkcwb'
                },
                {
                    url: "https://source.unsplash.com/collection/483251",
                    filename: 'YelpCamp/cgwouxrdc3q1ad12dxcx'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
