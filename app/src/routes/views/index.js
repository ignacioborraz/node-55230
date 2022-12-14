import express from 'express'
const router = express.Router()

import products from './products.js'

router.use('/', products)

export default router