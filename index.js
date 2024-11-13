const express = require("express")
const mongoose = require('mongoose')

const cors = require('cors')
const userRouter = require('./Routes/auth')
const cookieParser = require("cookie-parser");
const petRouter = require('./Routes/petr')


const PORT = process.env.PORT || 3001
const app = express()

app.use(cors({

    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT"],
    credentials: true
}))


app.use('/', (req, res) => {
    res.json({
        status: "ApI working fine",
        code:200
    })

})
app.use(cookieParser())
app.use(express.json());
app.use('/auth', userRouter)
app.use('/pet', petRouter)


mongoose.connect('mongodb://0.0.0.0:27017/user')







app.listen(3001, () => {
    console.log("server is Running");
})