const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  )
}

const normalizeUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

const signup = async (req, res) => {
  const { role } = req.params
  const { name, email, password } = req.body

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' })
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    return res.status(409).json({ message: 'Email is already in use.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
  })

  const token = signToken(user)

  return res.status(201).json({
    token,
    user: normalizeUser(user),
  })
}

const login = async (req, res) => {
  const { role } = req.params
  const { email, password } = req.body

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' })
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
    role,
  })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const token = signToken(user)

  return res.status(200).json({
    token,
    user: normalizeUser(user),
  })
}

const me = async (req, res) => {
  res.status(200).json({ user: req.user })
}

module.exports = {
  signup,
  login,
  me,
}
