import shoppingListModel from "../models/shoppingModel.js";

// Create - Add Shopping List
const addList = async (req, res) => {
    try {
        const { userId, items, dateAdded, status } = req.body;

        // Validate duplicate items by itemName
        const itemNames = items.map(item => item.itemName);
        const uniqueItemNames = new Set(itemNames);

        if (itemNames.length !== uniqueItemNames.size) {
            return res.status(400).json({ message: "Duplicate items are not allowed in a shopping list." });
        }

        // Validate dateAdded (should be today or future)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const addDate = new Date(dateAdded);
        if (addDate < today) {
            return res.status(400).json({ message: "Date cannot be in the past." });
        }

        const newList = new shoppingListModel({
            userId,
            items,
            dateAdded,
            status
        });

        await newList.save();

        res.status(201).json({ message: "Shopping list added successfully", shoppingList: newList });
    } catch (error) {
        res.status(500).json({ message: "Error adding shopping list", error: error.message });
    }
};

// Get One Shopping List by ID
const getShoppingListById = async (req, res) => {
    const { id } = req.params;

    try {
        const shoppingList = await shoppingListModel.findById(id);

        if (!shoppingList) {
            return res.status(404).json({ message: "Shopping list not found" });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shopping list", error: error.message });
    }
};


// Read - Get All Shopping Lists (with filters: weekly, monthly, status search)
const getAllLists = async (req, res) => {
    try {
        const { filter, status } = req.query;

        let filterQuery = {};

        if (status) {
            filterQuery.status = status;
        }

        const today = new Date();

        if (filter === "weekly") {
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            filterQuery.dateAdded = { $gte: startOfWeek };
        } else if (filter === "monthly") {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            filterQuery.dateAdded = { $gte: startOfMonth };
        }

        const lists = await shoppingListModel.find(filterQuery);

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shopping lists", error: error.message });
    }
};

// Update - Update Shopping List by ID
const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, dateAdded, status } = req.body;

        if (items) {
            const itemNames = items.map(item => item.itemName);
            const uniqueItemNames = new Set(itemNames);

            if (itemNames.length !== uniqueItemNames.size) {
                return res.status(400).json({ message: "Duplicate items are not allowed in a shopping list." });
            }
        }

        if (dateAdded) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const updateDate = new Date(dateAdded);

            if (updateDate < today) {
                return res.status(400).json({ message: "Date cannot be in the past." });
            }
        }

        const updatedList = await shoppingListModel.findByIdAndUpdate(id, {
            items,
            dateAdded,
            status
        }, { new: true });

        if (!updatedList) {
            return res.status(404).json({ message: "Shopping list not found" });
        }

        res.status(200).json({ message: "Shopping list updated successfully", shoppingList: updatedList });
    } catch (error) {
        res.status(500).json({ message: "Error updating shopping list", error: error.message });
    }
};

// Delete - Delete Shopping List by ID
const deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedList = await shoppingListModel.findByIdAndDelete(id);

        if (!deletedList) {
            return res.status(404).json({ message: "Shopping list not found" });
        }

        res.status(200).json({ message: "Shopping list deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting shopping list", error: error.message });
    }
};
// Search Shopping Lists by Status
/*const searchShoppingListsByStatus = async (req, res) => {
    const { status } = req.query;

    try {
        if (!status) {
            return res.status(400).json({ message: "Status query param is required" });
        }

        const lists = await shoppingListModel.find({ status: status });

        if (lists.length === 0) {
            return res.status(404).json({ message: "No shopping lists found with this status" });
        }

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: "Error searching shopping lists", error: error.message });
    }
};*/

export { addList, getAllLists, updateList, deleteList ,getShoppingListById};
