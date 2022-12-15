import express from 'express'
const router = express.Router()

import views from './views.js'

router.use('/', views)

export default router