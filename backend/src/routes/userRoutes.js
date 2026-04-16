const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const { dashboard, myRegistrations } = require('../controllers/userController')

const router = express.Router()

router.get('/dashboard', asyncHandler(dashboard))
router.get('/registrations', asyncHandler(myRegistrations))

module.exports = router
