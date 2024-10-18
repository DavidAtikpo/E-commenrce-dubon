import express from 'express'
import rechercheCtrl from '../controllers/rechercheCtrl'
import rechercheImage from '../controllers/rechercheImagesCtrl'

const router =express.Router()
router.post('/search-by-image', upload.single('image'),rechercheImage.searchByImg)
