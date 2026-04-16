const Event = require('../models/Event')
const Registration = require('../models/Registration')

const listAllEvents = async (req, res) => {
  const events = await Event.find()
    .populate('createdBy', 'name email')
    .sort({ date: 1 })

  res.status(200).json({ events })
}

const getEventById = async (req, res) => {
  const { eventId } = req.params

  const event = await Event.findById(eventId).populate('createdBy', 'name email')

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  const registrationStats = await Registration.aggregate([
    {
      $match: {
        event: event._id,
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])

  const stats = registrationStats.reduce(
    (acc, row) => {
      acc[row._id] = row.count
      return acc
    },
    { pending: 0, approved: 0, rejected: 0 },
  )

  res.status(200).json({ event, registrationStats: stats })
}

const registerForEvent = async (req, res) => {
  const { eventId } = req.params

  const event = await Event.findById(eventId)
  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  const existing = await Registration.findOne({
    user: req.user._id,
    event: event._id,
  })

  if (existing) {
    return res.status(409).json({
      message: 'You have already registered for this event.',
      registration: existing,
    })
  }

  const status = event.visibility === 'open' ? 'approved' : 'pending'

  const registration = await Registration.create({
    user: req.user._id,
    event: event._id,
    status,
    decidedBy: status === 'approved' ? event.createdBy : null,
    decidedAt: status === 'approved' ? new Date() : null,
  })

  res.status(201).json({
    message:
      status === 'approved'
        ? 'Registration approved immediately for open event.'
        : 'Registration submitted and pending admin approval.',
    registration,
  })
}

module.exports = {
  listAllEvents,
  getEventById,
  registerForEvent,
}
