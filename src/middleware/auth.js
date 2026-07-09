import admin from '../config/firebase.js'
import User from '../models/User.js'

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await admin.auth().verifyIdToken(token)

    let user = await User.findOne({ firebaseUid: decodedToken.uid })

    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        name: decodedToken.name || 'MunimJi User',
        email: decodedToken.email,
        photoURL: decodedToken.picture || '',
        language: 'en',
      })
      console.log('New user created:', user.email)
    }

    req.user = user
    req.firebaseUser = decodedToken
    next()
  } catch (error) {
    console.error('Auth error:', error.message)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}