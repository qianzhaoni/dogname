import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports'

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  const config = useRuntimeConfig()
  
  try {
    await mongoose.connect(config.mongodbUri)
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
} 