import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/me', requireAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        language: req.user.language,
        photoURL: req.user.photoURL,
        createdAt: req.user.createdAt,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/language', requireAuth, async (req, res) => {
  try {
    const { language } = req.body
    await User.findByIdAndUpdate(req.user._id, { language })
    res.json({ success: true, language })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name } = req.body
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    )
    res.json({ success: true, name: updated.name })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router