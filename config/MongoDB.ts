import mongoose, { ConnectionOptions } from 'mongoose'

export default {
  async start(): Promise<void> {
    const uris: string | undefined = process.env.MONGODB_CONNECTION_STRING
    const options: ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    try {
      if (typeof uris === 'string') {
        await mongoose.connect(uris, options)
      }
      return
    } catch (error) {
      await mongoose.connection.close()
    }
  }
}