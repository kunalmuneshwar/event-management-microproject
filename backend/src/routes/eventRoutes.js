const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const { requireAuth, requireRole } = require('../middleware/auth')
const {
  listAllEvents,
  getEventById,
  registerForEvent,
} = require('../controllers/eventController')

const router = express.Router()

router.get('/', asyncHandler(listAllEvents))
router.get('/:eventId', asyncHandler(getEventById))
router.post('/:eventId/register', requireAuth, requireRole('user'), asyncHandler(registerForEvent))

module.exports = router
