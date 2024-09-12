import mongoose from "mongoose";


const blogcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
        index:true,
    }
},{timestamps:true})

export default mongoose.model("BCategory",blogcategorySchema)