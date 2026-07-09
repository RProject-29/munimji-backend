import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import Goal from '../models/Goal.js'

const router = express.Router()

router.get('/', requireAuth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, goals })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const { type, label, targetAmount, savedAmount, deadline } = req.body
    if (!type || !label || !targetAmount) {
      return res.status(400).json({ error: 'type, label, and targetAmount are required' })
    }
    const goal = await Goal.create({
      userId: req.user._id,
      type,
      label,
      targetAmount,
      savedAmount: savedAmount || 0,
      deadline,
    })
    res.status(201).json({ success: true, goal })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id })
    if (!goal) return res.status(404).json({ error: 'Goal not found' })
    const { savedAmount, label, targetAmount, completed } = req.body
    if (savedAmount !== undefined) goal.savedAmount = savedAmount
    if (label) goal.label = label
    if (targetAmount) goal.targetAmount = targetAmount
    if (completed !== undefined) goal.completed = completed
    await goal.save()
    res.json({ success: true, goal })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    if (!goal) return res.status(404).json({ error: 'Goal not found' })
    res.json({ success: true, message: 'Goal deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router