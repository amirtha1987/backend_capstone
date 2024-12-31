 const express = require('express')
 //const PetModel = require('../models/Pet');
const Pet = require('../models/Pet');
const UserModel = require('../models/User')
 const router = express.Router()

router.post('/create-pets', async (req, res) => {
    Pet.create({
      name: req.body.name,
      age: req.body.age,
      species:req.body.species,
      breed: req.body.breed,
      specialCareRequired: req.body.specialCareRequired,
      imageUrl: req.body.imageUrl,
    }).then(result => {
        return res.json(result)
    }).catch(err => console.log(err))

});

  
 router.get('/pets', (req, res) => {
     PetModel.find()
         .then(pets => {
             return res.json(pets)
         }).catch(err => res.json(err))
 })

 router.get('/pet-by-id/:id', (req, res) => {
     const id = req.params.id;
     PetModel.findById({_id: id})
         .then(result => {
         return res.json(result)
     }).catch(err => res.json(err))
 })

 router.get('/saved-pets/:id', (req, res) => {
     const id = req.params.id;
     UserModel.findById({ _id: id })
         .then(result => {
             console.log(result)
             return res.json({savedPets: result.savedPets})
 })
         .catch(err => res.status(500).json(err))
 })
 router.get('/user-pets/:id', async (req, res) => {
     const id = req.params.id;
     try {
         const user = await UserModel.findById({ _id: id });
         const pets = await PetModel.find({
             _id: { $in: user.savedPets }
         })
         res.status(201).json(pets);
     } catch (err) {
         res.status(500).json(err)
     }
 })

 router.put('/', async (req, res) => {
     const pet = await PetModel.findById({ _id: req.body.petId });
     const user = await UserModel.findById({ _id: req.body.userId});
     user.savedPets.push(pet)
     user.save()
     return res.json({savedPets: user.savedPets})
 })


module.exports = router;
// const express = require("express");
// const Pet = require("../models/Pet");
// const UserModel = require("../models/User");

// const router = express.Router();

// const { createPet, getPets, getSinglepet, updatePet, deletePet} = require("../controller/petController");

// // Create a pet
// router.post("/", createPet);
// router.get("/", getPets);
// router.get("/:id", getSinglepet);
// router.patch("/:id", updatePet);
// router.delete("/:id", deletePet);

// module.exports = router;



















// // Get all pets
// router.get("/pets", async (req, res) => {
//   try {
//     const pets = await PetModel.find();
//     res.status(200).json(pets);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch pets", details: err });
//   }
// });

// // Get a pet by ID
// router.get("/pet-by-id/:id", async (req, res) => {
//   try {
//     const pet = await PetModel.findById(req.params.id);
//     if (!pet) return res.status(404).json({ error: "Pet not found" });
//     res.status(200).json(pet);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch pet", details: err });
//   }
// });

// // Get saved pets by user ID
// router.get("/saved-pets/:id", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.status(200).json({ savedPets: user.savedPets });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch saved pets", details: err });
//   }
// });

// // Get pets saved by a user
// router.get("/user-pets/:id", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const pets = await PetModel.find({ _id: { $in: user.savedPets } });
//     res.status(200).json(pets);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Failed to fetch user's pets", details: err });
//   }
// });

// // Save a pet for a user
// router.put("/save-pet", async (req, res) => {
//   try {
//     const { petId, userId } = req.body;

//     const pet = await PetModel.findById(petId);
//     if (!pet) return res.status(404).json({ error: "Pet not found" });

//     const user = await UserModel.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (!user.savedPets.includes(petId)) {
//       user.savedPets.push(petId);
//       await user.save();
//     }

//     res.status(200).json({ savedPets: user.savedPets });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save pet", details: err });
//   }
// });

// module.exports = router;
