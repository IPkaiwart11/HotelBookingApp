import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema)

//localhost:8800/api/hotels
// "name": "Divya hotel",
// "type": "hotel",
// "city": "Raipur",
// "address": "Goal chowk near city mall ",
// "distance": "600",
// "photos": [],
// "title": "welcome to my hotel",
// "desc": "stay your own room",
// "rooms": [],
// "cheapestPrice": 50,
//////////////////////
//"_id": "65410f19fc8d00ac291ded28"