const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  species: { type: String },
  breed: { type: String },
  specialCareRequired: { type: String },
  imageUrl: { type: String },
});

const Pet = mongoose.model("Pet", petSchema);


module.exports = Pet;
