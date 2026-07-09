import mongoose from 'mongoose'

const calculationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['sip', 'fd', 'rd', 'goal', 'inflation', 'wealth'],
    },
    inputs: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    label: String,
  },
  { timestamps: true }
)

export default mongoose.model('Calculation', calculationSchema)