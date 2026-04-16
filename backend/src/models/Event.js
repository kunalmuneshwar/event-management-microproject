const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ['open', 'private'],
      default: 'open',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
