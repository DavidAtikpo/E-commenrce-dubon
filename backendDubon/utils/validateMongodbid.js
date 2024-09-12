import mongoose from "mongoose";


const validateMongoDbId = (id)=>{
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if(!isValid){
    throw new Error("This is not vavlid or not found")
  };
};

export default validateMongoDbId