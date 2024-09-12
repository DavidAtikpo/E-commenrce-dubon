import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
 title:{
    type:String,
    require:true,
 },
 description:{
    type:String,
    require:true,
 },
 category:{
    type:String,
    require:true,
 },
 numViews:{
    type:Number,
    default:0,
 },
 isLiked:{
    type:Boolean,
    default:false,
 },
 isDisliked:{
type:Boolean,
default:false,
 },
 likes:[{type: mongoose.Schema.Types.ObjectId,
ref: "User"
},],
image:{
    type:String,
    default:"https://www.shutterstock.com/shutterstock/photos/1029506242/display_1500/stock-photo-blogging-blog-concepts-ideas-with-white-worktable-1029506242.jpg"
},
author:{
    type:String,
    default:"Admin",
},

},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    },
},{timestamps:true})

export default  mongoose.model("Blog",blogSchema);