const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const { requireAuth } = require('../middleware/auth')
const { signup, login, me } = require('../controllers/authController')

const router = express.Router()

router.post('/:role/signup', asyncHandler(signup))
router.post('/:role/login', asyncHandler(login))
router.get('/me', requireAuth, asyncHandler(me))

module.exports = router
