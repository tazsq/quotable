/* eslint-disable no-console */
import 'dotenv/config.js'
import mongoose from 'mongoose'
import app from './app.js'
import MongoClient from './MongoClient.js'

async function run() {
  const db = new MongoClient()

  // Validate environment variables
  const PORT = process.env.PORT || 4000
  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI environment variable is not set.')
    process.exit(1)
  }

  try {
    // Connect to database, then start the Express server
    await db.connect()
    app.listen(PORT, () => {
      console.log(`Quotable is running on port: ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1) // Exit the process with an error code
  }

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    try {
      await db.disconnect()
      console.log('Database disconnected successfully')
      process.exit(0)
    } catch (error) {
      console.error('Error during database disconnection:', error)
      process.exit(1)
    }
  })
}

run()
