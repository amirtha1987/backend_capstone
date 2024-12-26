const petModel = require("../models/Pet")
const mongoose = require("mongoose")


//to create a pet
const createPet = async (req, res) => {
    const { name, age, species, breed, specialCareRequired, imageUrl } = req.body
    try {
        const pet = await petModel.create({ name, age, species, breed, specialCareRequired, imageUrl })
        res.status(200).json(pet)
    } catch (e) {
        res.status(400).json({ error: e.message });

    }
};

// to get all pets - GET
const getPets = async(req,res) =>{
    try{
        const pets = await petModel.find({});
        res.status(200).json(pets)
    }
    catch (e) {
        res.status(400).json({ error: e.message });

    }
};

//to get a single pet - GET
const getSinglepet = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"task not found"})
    }
    try {
        const singlePet = await petModel.findById(id)
        res.status(200).json(singlePet)

    }
    catch (e) {
        res.status(400).json({ error: e.message });

    }

};

//to update a task - PATCH
const updatePet = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "task not found" })
    }
    try {
        const task = await petModel.findByIdAndUpdate({ _id: id },
            {
                ...req.body
            });
        res.status(200).json(task);
    } catch (e) {
        res.status(400).json({ error: e.message });
        
    }
   
};
//Delete pet - DELETE

const deletePet = async (req, res) => {
 const { id } = req.params;
 if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(404).json({ error: "task not found" });
    } 
    try {
        const pet = await petModel.findByIdAndDelete(id);
        res.status(200).json(pet)
            
    }   
    catch (e) {
      res.status(400).json({ error: e.message });  
    }
}

     
module.exports = {
    createPet,
    getPets,
    getSinglepet,
    updatePet,
    deleteTask,
};
