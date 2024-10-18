import express, { Router } from "express";
import AdBannerCtrl from "../controllers/AdBannerCtrl.js";

const route = express.Router()

route.post('/add-ad',AdBannerCtrl.createBanner)
route.get('/get-ads',AdBannerCtrl.getBanner)

export default route