const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const restaurantRouter = require('./routes/restaurant')
const foodItemsRouter = require('./routes/foodItems')
const cartRouter = require('./routes/cart')

dotenv.config()
const app = express()

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use('/api/v1/', indexRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/restaurant', restaurantRouter)
app.use('/api/v1/foodItems', foodItemsRouter)
app.use('/api/v1/cart', cartRouter)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server started on port ${process.env.PORT}`)
    mongoose.connect(process.env.MONGOOSE_URI_STRING).then(()=>{
        console.log("Connected to: ", process.env.MONGOOSE_URI_STRING)
    }).catch((error)=>{
        console.log("DB connection error", error)
    })
})