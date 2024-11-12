const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  species: { type: String},
  breed: {type: String},
 special_care_required: { type:String},
  imageUrl: { type: String },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required:true
//  }
  
});

const PetModel = mongoose.model("pets", PetSchema);
module.exports = PetModel;
