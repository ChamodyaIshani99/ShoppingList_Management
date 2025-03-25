import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
    shoppingId: {
        type: String, 
        unique: true,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
        
    },
    status: {
        type: String,
        enum: ["buy", "not"],
        required: true,
        default: "not"
    },
    items: [
        {
            itemName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});


const shoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);

export default shoppingListModel;
