import express from "express";
import VendeurController from '../controllers/VendeurController.js'

const router = express.Router()

router.post('/update-profile',VendeurController.updateUserProfil)
router.post('/produits', VendeurController.postProduct)
router.get('/vendeur/produits',VendeurController.getProduct)

