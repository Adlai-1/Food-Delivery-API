import { config } from "dotenv"
import express from "express"
import mongo from "mongoose";
import { ResturantRouter } from "./Routers/Resturant.js"
import { MenuRouter } from "./Routers/FoodMenu.js"
import { OrderRouter } from "./Routers/FoodOrders.js"
import { UserRouter } from "./Routers/User.js";
import { AdminRouter } from "./Routers/Admin.js"

config()

const app = express()
const { connect } = mongo;

//Middleware for parsing json data...
app.use(express.json())

// Welcome Endpoint...
app.get('/welcome:name', (req, res) => {
  res.json({ 'message': `Hello ${req.params.name}, welcome to the Food-Delivery-API` })
})

app.use('/resturant', ResturantRouter)
app.use('/menu', MenuRouter)
app.use('/order', OrderRouter)
app.use('/user', UserRouter)
app.use('/admin', AdminRouter)

//Establishing a connection for the MongoDB Server...
connect(process.env.MONGO);

//Setting-up listener on port 5000 number...
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
})