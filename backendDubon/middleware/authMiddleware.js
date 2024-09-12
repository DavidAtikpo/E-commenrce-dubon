import User from "../models/userModel.js";
import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(async(req,res,next)=>{
  let token;
  if(req?.headers?.authorization?.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1]
    try {
    if(token){
      const decoded= jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded?.id)
      req.user= user;
      next();
    };
    } catch (error) {
      throw new Error("Not authorized, token expired please login again")
    }
  }else{
    throw new Error("there is no token attached to header")
  }
  
});

// authorization by admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }); // Use findOne instead of find

  if (!adminUser || adminUser.role !== 'admin') {
    // Check if adminUser is not found or role is not admin
    throw new Error("You are not an admin");
  } else {
    next();
  }
});


export default{authMiddleware,isAdmin}