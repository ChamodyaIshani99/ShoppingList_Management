import express from "express";
import { createList, getAllLists, getListById, updateList, deleteList } from "../controllers/shoppingController.js";

const shoppingRouter = express.Router();

// Create a new shopping list
shoppingRouter.post("/add", createList);

// Get all shopping lists
shoppingRouter.get("/", getAllLists);

// Get a single shopping list by ID
shoppingRouter.get("/:id", getListById);

// Update a shopping list
shoppingRouter.put("/update/:id", updateList);

// Delete a shopping list
shoppingRouter.delete("/delete/:id", deleteList);

export default shoppingRouter;


