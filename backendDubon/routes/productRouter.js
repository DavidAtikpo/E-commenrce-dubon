import express  from "express";
import productCtrl from "../controllers/productCtrl.js"
import middleware  from "../middleware/authMiddleware.js"

const router= express.Router();

router.post("/",productCtrl.createProduct);
router.get("/:id",productCtrl.getaProduct);
router.get("/",productCtrl.getAllProduct)
router.put("/:id",middleware.authMiddleware,middleware.isAdmin,productCtrl.updateProduct)
router.delete("/:id",middleware.authMiddleware,middleware.isAdmin,productCtrl.deleteProduct)

export default router