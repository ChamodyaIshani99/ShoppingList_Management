import mongoose from "mongoose";

const shoppingSchema= new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    }
})

const shoppingModel=mongoose.model.shoppingList ||mongoose.model("shoppingList",shoppingSchema);

export default shoppingModel;
