import BCategory from "../models/blogCatModel.js"
import asyncHandler from "express-async-handler"
import validateMongoDbId from "../utils/validateMongodbid.js"



const createcategory = asyncHandler(async(req,res)=>{
    try {
        const newCategory = await BCategory.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
});

const deletecategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        validateMongoDbId(id)
        const deleteCategory = await BCategory.findByIdAndDelete(id);
        res.json("deleted")
    } catch (error) {
        throw new Error(error)
    }
});

const updatecategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        validateMongoDbId(id)
        const updateCategory = await BCategory.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error)
    }
});

const getcategory = asyncHandler(async(req,res)=>{
    try {
      const {id} = req.params;
      validateMongoDbId(id)
      const getCategory = await BCategory.findById(id)
      res.json(getCategory) 
    } catch (error) {
        throw new Error(error)
    }
});

const getAllcategory = asyncHandler(async(req,res)=>{
    try {
      const getAllCategory = await BCategory.find() 
      res.json(getAllCategory) 
    } catch (error) {
        throw new Error(error)
    }
})

export default {createcategory,deletecategory,updatecategory,getAllcategory,getcategory}