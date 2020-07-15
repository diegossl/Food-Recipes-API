import mongoose, { SchemaDefinition } from 'mongoose'
const Schema = mongoose.Schema

const serie: SchemaDefinition = {
  name: { type: string },
  genres: { type: [String] }
}

const serieSchema = new Schema(serie)

export default mongoose.model('Serie', serieSchema)