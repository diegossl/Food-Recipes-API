import mongoose, { ConnectionOptions, mongo } from 'mongoose'

class MongoDBService {
  private static instance: MongoDBService

  private constructor() {}

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService()
    }
    return MongoDBService.instance
  }

  public async getConnection(): Promise<typeof mongoose | undefined> {
    const uris: string | undefined = process.env.MONGODB_CONNECTION_STRING
    console.log(uris)
    const options: ConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    try {
      if (typeof uris === 'string') {
        return await mongoose.connect(uris, options)
      }
      return undefined
    } catch (error) {
      await mongoose.connection.close()
    }
  }
}

export default MongoDBService