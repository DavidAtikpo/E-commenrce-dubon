import  express  from "express";
import blogCtrl from "../controllers/blogCtrl.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/",authMiddleware.authMiddleware,blogCtrl.createBlog)
router.put("/Likes",authMiddleware.authMiddleware,blogCtrl.likeBlogs)
router.put("/Dislikes",authMiddleware.authMiddleware,blogCtrl.dislikeBlogs)
router.put("/:id",authMiddleware.authMiddleware,blogCtrl.updateBlog)
router.get("/:id",authMiddleware.authMiddleware,blogCtrl.getBlog)
router.get("/",authMiddleware.authMiddleware,blogCtrl.getAllBlogs)
router.delete("/:id",authMiddleware.authMiddleware,blogCtrl.deleteBlog)

export default router