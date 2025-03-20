import shoppingModel from "../models/shoppingModel.js";

// Create - Add Item
const addList = async (req, res) => {
    const { itemName, qty } = req.body;

    try {
        const newItem = new shoppingModel({ itemName, qty });
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
};

// Read - Get All Items
const getAllItems = async (req, res) => {
    try {
        const items = await shoppingModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
};

// Update - Update Item by ID
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemName, qty } = req.body;

    try {
        const updatedItem = await shoppingModel.findByIdAndUpdate(id, { itemName, qty }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
};

// Delete - Delete Item by ID
const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await shoppingModel.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
};

export { addList, getAllItems, updateItem, deleteItem };
