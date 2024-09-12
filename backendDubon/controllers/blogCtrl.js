import Blog from "../models/blogModel.js";
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongodbid.js";

const createBlog = asyncHandler(async(req,res) => {
try {
    const newBlog = await Blog.create(req.body)
    res.json(newBlog
    )
} catch (error) {
    throw new Error(error)
}
})

const updateBlog = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params;
        validateMongoDbId(blogId);
        const newBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(newBlog
        )
    } catch (error) {
        throw new Error(error)
    }
    })

    const getBlog = asyncHandler(async(req,res) => {
        try {
            const {id}= req.params;
            validateMongoDbId(blogId);
            const getBlog = await Blog.findById(id);
            const updateViews = await Blog.findByIdAndUpdate(id,{
                $inc:{numViews:1},
            },{new:true}
            );
            res.json(updateViews
            )
        } catch (error) {
            throw new Error(error)
        }
        })

        const getAllBlogs= asyncHandler(async(req,res)=>{
            try {
              const getAllBlogs= await Blog.find()
              res.json(getAllBlogs)  
            } catch (error) {
             throw new Error(error)   
            }
        })


const deleteBlog = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params;
        validateMongoDbId(blogId);
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog
        )
    } catch (error) {
        throw new Error(error)
    }
    })

    // like a blog
    const likeBlogs = asyncHandler(async(req,res)=>{
        const {blogId}= req.body;
        validateMongoDbId(blogId);
        const blog = await Blog.findById(blogId)
        const loginUserId= req.user?._id;
        const isLiked = blog?.isLiked;
        const alreadyDisliked = blog?.dislikes?.find(
            (userId => userId?.toString()== loginUserId?.toString())
        );
        if(alreadyDisliked){
            const blog = await Blog.findByIdAndUpdate(blogId,
               {
                $pull:{likes:loginUserId},
                isDisliked:false,
               },
               {new:true}
                );
                res.json(blog);
        };
      if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull:{likes:loginUserId},
                isLiked:false,
               },
               {new:true}
            );
            res.json(blog);``
      }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $push:{likes:loginUserId},
                isLiked:true,
               },
               {new:true}
            );
            res.json(blog);
      }
    });


    const dislikeBlogs = asyncHandler(async(req,res)=>{
        const {blogId}= req.body;
        validateMongoDbId(blogId);
        const blog = await Blog.findById(blogId)
        const loginUserId= req.user?._id;
        const isDisliked = blog?.isDisliked;
        const alreadyLiked = blog?.likes?.find(
            (userId => userId?.toString()== loginUserId?.toString())
        );
        if(alreadyLiked){
            const blog = await Blog.findByIdAndUpdate(blogId,
               {
                $pull:{likes:loginUserId},
                isLiked:false,
               },
               {new:true}
                );
                res.json(blog);
        };
      if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull:{likes:loginUserId},
                isDisliked:false,
               },
               {new:true}
            );
            res.json(blog);``
      }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $push:{likes:loginUserId},
                isDisliked:true,
               },
               {new:true}
            );
            res.json(blog);
      }

    });

export default {createBlog, updateBlog,getBlog,getAllBlogs,deleteBlog,likeBlogs,dislikeBlogs}