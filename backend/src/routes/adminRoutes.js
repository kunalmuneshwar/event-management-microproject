const express = require('express')
const asyncHandler = require('../middleware/asyncHandler')
const {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  dashboard,
  listEventRequests,
  decideRegistration,
} = require('../controllers/adminController')

const router = express.Router()

router.get('/dashboard', asyncHandler(dashboard))
router.get('/events', asyncHandler(listEvents))
router.post('/events', asyncHandler(createEvent))
router.put('/events/:eventId', asyncHandler(updateEvent))
router.delete('/events/:eventId', asyncHandler(deleteEvent))
router.get('/events/:eventId/requests', asyncHandler(listEventRequests))
router.patch('/registrations/:registrationId/decision', asyncHandler(decideRegistration))

module.exports = router
