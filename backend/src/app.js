const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const { requireAuth, requireRole } = require('./middleware/auth')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/admin', requireAuth, requireRole('admin'), adminRoutes)
app.use('/api/user', requireAuth, requireRole('user'), userRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
