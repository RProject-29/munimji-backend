import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    photoURL: String,
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'pa'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)