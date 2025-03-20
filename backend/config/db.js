import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://Chamodya:Chamodya897@cluster0.gqv5t.mongodb.net/shopping-list ').then(()=>console.log("DB Connected"));
}