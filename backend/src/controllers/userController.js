const Registration = require('../models/Registration')

const dashboard = async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id }).populate(
    'event',
    'name shortDescription date tags visibility',
  )

  const stats = registrations.reduce(
    (acc, item) => {
      acc[item.status] += 1
      return acc
    },
    { pending: 0, approved: 0, rejected: 0 },
  )

  res.status(200).json({
    stats,
    registrations,
  })
}

const myRegistrations = async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate('event', 'name shortDescription date tags visibility')
    .sort({ createdAt: -1 })

  res.status(200).json({ registrations })
}

module.exports = {
  dashboard,
  myRegistrations,
}
