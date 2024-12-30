require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const cookieParser = require("cookie-parser");

const userRouter = require("./Routes/auth");
const petRouter = require("./Routes/petr");

const app = express();

 //CORS Middleware
 app.use(cors());

// // Middleware
// app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3001",
    "https://cheery-bavarois-aec17a.netlify.app"
  ],
  optionsSuccessSatus: 200,
};
app.use(cors(corsOptions));

// // Routes
app.use("api/auth", userRouter);
app.use("api/pet", petRouter);

app.use((req, res, next) => {
  console.log("path " + req.path + "method " + req.method);
  next();
});
 app.post('/create-pet', (req, res) => { // Handle the request to create a pet
   res.status(201).send({ message: 'Pet created sucessfully' });
 });




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Sucessfully and listening to " + process.env.PORT);
    });
  }).catch((err) => {
    console.error("Database connection error:", err);
  });
