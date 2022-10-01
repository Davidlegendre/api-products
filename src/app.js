import express from "express";
import userRoutes from './Routes/user.routes'
import productRoutes from './Routes/product.routes'
import cors from 'cors'
import morgan from "morgan";

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use("/user", userRoutes)
app.use("/products",productRoutes)

module.exports = app