import express from 'express'
import codePromo from '../controllers/codePromo.js'


const router = express.Router()

router.post('/generate-promo',codePromo)


export default router