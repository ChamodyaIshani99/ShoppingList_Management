import express from "express";
import { addList, getAllLists, updateList, deleteList,getShoppingListById } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

shoppingRouter.post("/add", addList);               // Create Shopping List
//shoppingRouter.get("/search", searchShoppingListsByStatus);
shoppingRouter.get("/", getAllLists);               // Get All Lists (with filter/status search)
shoppingRouter.put("/update/:id", updateList);      // Update Shopping List
shoppingRouter.delete("/delete/:id", deleteList);   // Delete Shopping List
shoppingRouter.get("/:id", getShoppingListById);



export default shoppingRouter;


