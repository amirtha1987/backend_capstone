const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const petSchema = new Schema(
  {
  name: { type: String },
  age: { type: Number },
  species: { type: String },
  breed: { type: String },
  specialCareRequired: { type: String },
  imageUrl: { type: String },
  }
);




module.exports = mongoose.model("pet", petSchema);
