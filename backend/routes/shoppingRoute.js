import express from "express"
import { addList, getAllItems, updateItem, deleteItem } from "../controllers/shoppingController.js";

const shoppingRouter=express.Router();

shoppingRouter.post("/add", addList); // Create
shoppingRouter.get("/", getAllItems); // Read
shoppingRouter.put("/update/:id", updateItem); // Update
shoppingRouter.delete("/delete/:id", deleteItem); // Delete


export default shoppingRouter;



