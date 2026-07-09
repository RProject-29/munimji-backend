import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import Calculation from '../models/Calculation.js'

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
  try {
    const calculations = await Calculation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
    res.json({ success: true, calculations })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const { type, inputs, result, label } = req.body
    if (!type || !inputs || !result) {
      return res.status(400).json({ error: 'type, inputs, and result are required' })
    }
    const calculation = await Calculation.create({
      userId: req.user._id,
      type,
      inputs,
      result,
      label,
    })
    res.status(201).json({ success: true, calculation })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Calculation.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    res.json({ success: true, message: 'Calculation deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router