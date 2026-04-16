const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid token user.' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have access to this resource.' })
    }

    next()
  }
}

module.exports = {
  requireAuth,
  requireRole,
}
