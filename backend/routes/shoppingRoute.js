import express from "express"
import { addList } from "../controllers/shoppingController.js"

const shoppingRouter=express.Router();

shoppingRouter.post("/add",addList)


export default shoppingRouter;



