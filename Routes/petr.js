const express = require('express')
const PetModel = require('../models/Pet')
const UserModel = require('../models/User')
const router = express.Router()

router.post('/create-pet', (req, res) => {
    PetModel.create({
        name: req.body.name,
        age: req.body.age,
        species: req.body.species,
        breed: req.body.breed,
        special_care_required: req.body.special_care_required,
        imageUrl: req.body.imageUrl,
    }).then(result => {
        return res.json(result)
    }).catch(err =>
        console.log(err))

})


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