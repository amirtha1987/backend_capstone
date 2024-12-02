require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')

const cors = require('cors')
const userRouter = require('./Routes/auth')
const cookieParser = require("cookie-parser");
const petRouter = require('./Routes/petr')


const PORT = process.env.PORT || 3001
const app = express()
app.use(cors());

app.use(
  cors({
    origin: [" https://amirtha1987.github.io"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);


app.use('/', (req, res) => {
    res.send("Api is working fine")
    })


app.use(cookieParser())
app.use(express.json());
app.use('/auth', userRouter)
app.use('/pet', petRouter)


// mongoose.connect('process.env.MONGO_URI')
// app.listen(process.env.PORT, () => {
//     console.log("server is Running");
// })


mongoose
  .connect(process.env.MONGO_URI,{})
  .then((result) => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));








