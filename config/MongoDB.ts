import mongoose, { ConnectionOptions } from 'mongoose'

class MongoDB {
  private static instance: MongoDB

  private constructor() {}

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB()
    }
    return MongoDB.instance
  }

  public async startConnection(): Promise<typeof mongoose | undefined> {
    const uris: string | undefined = process.env.MONGODB_CONNECTION_STRING
    const options: ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    try {
      if (typeof uris === 'string') {
        return await mongoose.connect(uris, options)
      }
    } catch (error) {
      await mongoose.connection.close()
    }
  }
}

export default MongoDB.getInstance()