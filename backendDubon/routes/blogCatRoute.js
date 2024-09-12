import express  from "express";
import blogCatCtl from "../controllers/blogCatCtl.js";
import middleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",middleware.authMiddleware,middleware.isAdmin,blogCatCtl.createcategory)
router.delete("/delete/:id",middleware.authMiddleware,middleware.isAdmin,blogCatCtl.deletecategory)
router.put('/update/:id',middleware.authMiddleware,middleware.isAdmin,blogCatCtl.updatecategory)
router.get('/getcategory/:id',middleware.authMiddleware,middleware.isAdmin,blogCatCtl.getcategory)
router.get('/getallcategory',middleware.authMiddleware,middleware.isAdmin,blogCatCtl.getAllcategory)

export default router