const mongoose = require('mongoose')


const UserSchema= new mongoose.Schema({


  username: {type: String,required: true,unique:true},
  password: {type: String,required: true},
  savedPets:[{type: mongoose.Schema.Types.ObjectId, ref:"pets"}]

})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;

