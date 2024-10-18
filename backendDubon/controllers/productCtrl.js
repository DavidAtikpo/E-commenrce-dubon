import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

// Créer un produit avec images
const creatProduct = asyncHandler(async (req, res) => {
  try {
    // Convertir les données du produit en objet JavaScript
    const productData = JSON.parse(req.body.productData);

    // Vérifier si des fichiers sont présents dans la requête
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    // Obtenir les chemins des images uploadées
    const imagePaths = req.files.map((file) => {
      return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    });

    // Créer un slug unique basé sur le titre ou le nom
    const slug = slugify(productData.title || productData.name, { lower: true });

    // Calculer le prix final après remise
    const finalPrice = productData.discount
      ? (parseFloat(productData.price) - (parseFloat(productData.price) * (parseFloat(productData.discount) / 100))).toFixed(2)
      : parseFloat(productData.price).toFixed(2);

    // Créer un nouvel objet produit avec les données et les images
    const newProduct = new Product({
      ...productData,
      images: imagePaths,
      slug,
      finalPrice,
    });

    // Enregistrer le produit dans la base de données
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error while creating product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// update product 

const updateProduct = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;
    if(req.body.title){
      req.body.slug = slugify(req.body.title);
    }
    const updateProducts = await Product.findOneAndUpdate({_id:id},req.body,{
      new:true,
    })
    res.json(updateProducts)
  } catch (error) {
    throw new Error(error)
  }
});

// delete a product 

const deleteProduct = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;
    const updateProducts = await Product.findByIdAndDelete({_id:id})
    res.json({message:"delete successfully"})
  } catch (error) {
    throw new Error(error)
  }
})



// get a product
const getaProduct = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;
  const findProduct = await Product.findById(id)
  res.json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
});
// get all product 

const getAllProduct = asyncHandler(async(req,res)=>{
  try {
    const queryObj = {...req.query};
    const excludeFields = ["page","sort","limit","fields"];
    excludeFields.forEach((el)=>delete queryObj[el])
    console.log(queryObj);
    let queryStr= JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt)\b/g, (match)=>`$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // Sorting 

    if(req.query.sort){
      const sortBy = req.query.sort.split(",").json("");
      query= query.sort(sortBy);
    }else{
      query= query.sort("-createAt");
    }

    // limiting the fields
    if(req.query.fields){
      const fields =req.query.fields. split(",").json("");
      query = query.select(fields);
    }else{
      query=query.select("-__v");
    }

// pagination

const page = req.query.page;
const limit = req.query.limit;
const skip =(page - 1)* limit;
query = query.skip(skip).limit(limit)
if(req.query.page){
  const productCount = await Product.countDocuments();
  if (skip>=productCount) throw new Error("this page does not exist")
}
console.log(page, limit, skip);


    const product = await query;
    res.json(product);

  } catch (error) {
    throw new Error(error)
  }
})

export default {creatProduct,getaProduct,getAllProduct,updateProduct,deleteProduct,}