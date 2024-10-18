import Category from "../models/prodcategoryModel.js"
import asyncHandler from "express-async-handler"
import validateMongoDbId from "../utils/validateMongodbid.js"
import Product from '../models/productModel.js'



const createcategory = asyncHandler(async(req,res)=>{
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
});

const deletecategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        validateMongoDbId(id)
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json("deleted")
    } catch (error) {
        throw new Error(error)
    }
});

const updatecategory = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        validateMongoDbId(id)
        const updateCategory = await Category.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error)
    }
});

const getcategory = asyncHandler(async(req,res)=>{
    try {
      const {id} = req.params;
      validateMongoDbId(id)
      const getCategory = await Category.findById(id)
      res.json(getCategory) 
    } catch (error) {
        throw new Error(error)
    }
});

const getAllcategory = asyncHandler(async(req,res)=>{
    try {
      const getAllCategory = await Category.find() 
      res.json(getAllCategory) 
    } catch (error) {
        throw new Error(error)
    }
})

// get categories
const getCategory = async (req, res) => {
    try {
      // Utilisez distinct pour récupérer les catégories uniques des produits
      const categories = await Product.distinct('category');
      console.log('Catégories:*****', categories);
  
      res.json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des catégories de produits' });
    }
  };
  

// Route to get subcategories for a specific category
const getSubcategorie = async (req, res) => {
  const { category } = req.params;

  try {
    // Find distinct subcategories for the specified category
    const subcategories = await Product.distinct('subcategory', { category });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
};




export default {createcategory,getSubcategorie,deletecategory,updatecategory,getAllcategory,getCategory,getcategory}