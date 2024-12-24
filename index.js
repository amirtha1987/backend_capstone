require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//const cors = require("cors");
//const cookieParser = require("cookie-parser");

//const userRouter = require("./Routes/auth");
const petRouter = require("./Routes/petr");

const app = express();

// CORS Middleware
// app.use(
//   cors({
//     origin: ["https://amirtha1987.github.io"], // Corrected extra space
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );

// // Middleware
// app.use(cookieParser());
app.use(express.json());

// // Routes
// app.use("/auth", userRouter);
app.use("/api/pets", petRouter);

// // Default Route
// app.get("/", (req, res) => {
//   res.send("API is working fine");
// });
// app.options("*", cors());

app.use((req, res, next) => {
  console.log("path " + req.path + "method " + req.method);
  next();
 });




// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
// DB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Sucessfully and listening to " + process.env.PORT);
    });
  }).catch((err) => {
    console.error("Database connection error:", err);
  });
