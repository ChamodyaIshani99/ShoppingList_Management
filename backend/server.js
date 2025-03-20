import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import shoppingRouter from "./routes/shoppingRoute.js"



//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/shoppingList",shoppingRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})