import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [
        {
            itemName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"]
            }
        }
    ],
    dateAdded: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: "Date cannot be in the past"
        }
    },
    status: {
        type: String,
        enum: ["buy", "not"],
        required: true,
        default: "not"
    }
});

const shoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);

export default shoppingListModel;
