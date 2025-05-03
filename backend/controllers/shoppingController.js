import shoppingListModel from "../models/shoppingModel.js";

// Generate the next shoppingId safely
const generateNextShoppingId = async () => {
    const allLists = await shoppingListModel.find({});
    let maxId = 0;

    allLists.forEach(list => {
        const num = parseInt(list.shoppingId.replace("SL", ""));
        if (!isNaN(num) && num > maxId) {
            maxId = num;
        }
    });

    return `SL${maxId + 1}`;
};

// Create a new shopping list
const createList = async (req, res) => {
    try {
        const { dateAdded, status, items } = req.body;
        const shoppingId = await generateNextShoppingId();

        const shoppingList = new shoppingListModel({
            shoppingId,
            dateAdded,
            status,
            items
        });

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
