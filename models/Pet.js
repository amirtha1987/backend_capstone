const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    species: { type: String },
    breed: { type: String },
    specialCareRequired: { type: String },
    imageUrl: { type: String },
  })
const PetModel = mongoose.model("pet", PetSchema)
module.exports = PetModel;
