require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./Routes/auth");
const petRouter = require("./Routes/petr");

const PORT = process.env.PORT || 3001;
const app = express();

// CORS Middleware
app.use(
  cors({
    origin: ["https://amirtha1987.github.io"], // Corrected extra space
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/auth", userRouter);
app.use("/pet", petRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("API is working fine");
});
app.options("*", cors());

app.use((req, res, next) => {
  req.url = req.url.replace(/\/$/, ""); // Remove trailing slash
  next();
});



app.use('/api', petRouter); // Adjust the base path if needed



// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
