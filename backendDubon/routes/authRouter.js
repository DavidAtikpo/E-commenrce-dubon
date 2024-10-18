import express from "express";
import userCtrl from "../controllers/userCtrl.js"
import middleware  from "../middleware/authMiddleware.js"
import authController from "../controllers/authController.js";
import upload from '../middleware/upload.js'

const router= express.Router();
router.put('/profilePhoto',upload.array('images', 10), userCtrl.uploadProfile);

router.post('/register',authController.register);
router.post('/login',userCtrl.login);
router.post('/verifycode',authController.verifyCode)
router.get('/all-users',userCtrl.getAllUser);
router.get("/",middleware.authMiddleware,middleware.isAdmin,userCtrl.getUserById);
router.delete('/delete',middleware.authMiddleware,userCtrl.deleteUserById)
// router.put('/update',middleware.authMiddleware,userCtrl.updateUser)
// router.put('/block/:id',middleware.authMiddleware,middleware.isAdmin,userCtrl.blockUser)
// router.put('/unblock/:id',middleware.authMiddleware,middleware.isAdmin,userCtrl.unblockUser)
router.get('/refresh',userCtrl.handleRefreshToken)
router.get('/logout',userCtrl.logout)
// router.put('/password',middleware.authMiddleware,userCtrl.updatePassword),
router.post('/forgot-password',authController.forgotPassword)
// router.put('/reset-password',authController.resetPassword)
router.post('/logout',middleware.authMiddleware,authController.logoutUser)
router.post('/verify-captcha', authController.verifyCaptcha);
export default router;
