import shoppingListModel from "../models/shoppingModel.js";

// Create a new shopping list
const createList = async (req, res) => {
    try {
        const { dateAdded, status, items } = req.body;

        // Find the last inserted shopping list entry
        const lastList = await shoppingListModel.findOne().sort({ shoppingId: -1 });

        let shoppingId;

        if (lastList && lastList.shoppingId) {
            // Extract numeric part and increment it
            const lastIdNum = parseInt(lastList.shoppingId.substring(2)); 
            shoppingId = `SL${lastIdNum + 1}`;
        } else {
            // If no previous shopping list exists, start from SL01
            shoppingId = "SL01";
        }

        const shoppingList = new shoppingListModel({ shoppingId, dateAdded, status, items });
        await shoppingList.save();
        res.status(201).json(shoppingList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Get all shopping lists
const getAllLists = async (req, res) => {
    try {
        const shoppingLists = await shoppingListModel.find();
        res.status(200).json(shoppingLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single shopping list by ID
const getListById = async (req, res) => {
    try {
        const shoppingList = await shoppingListModel.findById(req.params.id);
        if (!shoppingList) return res.status(404).json({ message: "Shopping list not found" });
        res.status(200).json(shoppingList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a shopping list
const updateList = async (req, res) => {
    try {
        const updatedShoppingList = await shoppingListModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedShoppingList) return res.status(404).json({ message: "Shopping list not found" });
        res.status(200).json(updatedShoppingList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a shopping list
const deleteList = async (req, res) => {
    try {
        const deletedShoppingList = await shoppingListModel.findByIdAndDelete(req.params.id);
        if (!deletedShoppingList) return res.status(404).json({ message: "Shopping list not found" });
        res.status(200).json({ message: "Shopping list deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createList, getAllLists, getListById, updateList, deleteList };
