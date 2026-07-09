import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['bike', 'laptop', 'education', 'marriage', 'house', 'emergency', 'retirement', 'custom'],
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    savedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deadline: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Goal', goalSchema)