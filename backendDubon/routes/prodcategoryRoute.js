import express  from "express";
import categoryCtl from "../controllers/prodcategoryCtl.js";
import middleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",middleware.authMiddleware,middleware.isAdmin,categoryCtl.createcategory)
router.delete("/delete/:id",middleware.authMiddleware,middleware.isAdmin,categoryCtl.deletecategory)
router.put('/update/:id',middleware.authMiddleware,middleware.isAdmin,categoryCtl.updatecategory)
router.get('/getcategory/:id',middleware.authMiddleware,middleware.isAdmin,categoryCtl.getcategory)
router.get('/getallcategory',middleware.authMiddleware,middleware.isAdmin,categoryCtl.getAllcategory)
router.get('/categories',categoryCtl.getCategory,)
export default router