const Event = require('../models/Event')
const Registration = require('../models/Registration')

const parseTags = (input) => {
  if (Array.isArray(input)) {
    return input.filter(Boolean).map((tag) => `${tag}`.trim()).filter(Boolean)
  }

  if (typeof input === 'string') {
    return input
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  return []
}

const createEvent = async (req, res) => {
  const { name, shortDescription, date, tags, visibility } = req.body

  if (!name || !shortDescription || !date) {
    return res.status(400).json({
      message: 'name, shortDescription, and date are required.',
    })
  }

  const event = await Event.create({
    name,
    shortDescription,
    date,
    tags: parseTags(tags),
    visibility: visibility === 'private' ? 'private' : 'open',
    createdBy: req.user._id,
  })

  res.status(201).json({ event })
}

const listEvents = async (req, res) => {
  const events = await Event.find({ createdBy: req.user._id }).sort({ date: 1 })
  res.status(200).json({ events })
}

const updateEvent = async (req, res) => {
  const { eventId } = req.params
  const { name, shortDescription, date, tags, visibility } = req.body

  const event = await Event.findOne({ _id: eventId, createdBy: req.user._id })

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  if (name !== undefined) {
    event.name = name
  }

  if (shortDescription !== undefined) {
    event.shortDescription = shortDescription
  }

  if (date !== undefined) {
    event.date = date
  }

  if (tags !== undefined) {
    event.tags = parseTags(tags)
  }

  if (visibility !== undefined) {
    event.visibility = visibility === 'private' ? 'private' : 'open'
  }

  await event.save()
  res.status(200).json({ event })
}

const deleteEvent = async (req, res) => {
  const { eventId } = req.params

  const event = await Event.findOneAndDelete({
    _id: eventId,
    createdBy: req.user._id,
  })

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  await Registration.deleteMany({ event: event._id })

  res.status(200).json({ message: 'Event deleted successfully.' })
}

const dashboard = async (req, res) => {
  const adminEventIds = (await Event.find({ createdBy: req.user._id }).select('_id')).map(
    (event) => event._id,
  )

  const [totalEvents, privateEvents, openEvents, pendingRequests, approvedRequests] =
    await Promise.all([
      Event.countDocuments({ createdBy: req.user._id }),
      Event.countDocuments({ createdBy: req.user._id, visibility: 'private' }),
      Event.countDocuments({ createdBy: req.user._id, visibility: 'open' }),
      Registration.countDocuments({
        event: { $in: adminEventIds },
        status: 'pending',
      }),
      Registration.countDocuments({
        event: { $in: adminEventIds },
        status: 'approved',
      }),
    ])

  res.status(200).json({
    stats: {
      totalEvents,
      privateEvents,
      openEvents,
      pendingRequests,
      approvedRequests,
    },
  })
}

const listEventRequests = async (req, res) => {
  const { eventId } = req.params

  const event = await Event.findOne({ _id: eventId, createdBy: req.user._id })
  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  const registrations = await Registration.find({ event: eventId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 })

  res.status(200).json({ registrations })
}

const decideRegistration = async (req, res) => {
  const { registrationId } = req.params
  const { decision } = req.body

  if (!['approved', 'rejected'].includes(decision)) {
    return res.status(400).json({ message: 'Decision must be approved or rejected.' })
  }

  const registration = await Registration.findById(registrationId).populate('event')

  if (!registration) {
    return res.status(404).json({ message: 'Registration not found.' })
  }

  if (`${registration.event.createdBy}` !== `${req.user._id}`) {
    return res.status(403).json({
      message: 'You can only decide requests for your own events.',
    })
  }

  registration.status = decision
  registration.decidedBy = req.user._id
  registration.decidedAt = new Date()

  await registration.save()

  res.status(200).json({ registration })
}

module.exports = {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  dashboard,
  listEventRequests,
  decideRegistration,
}
