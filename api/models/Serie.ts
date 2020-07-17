import mongoose, { SchemaDefinition } from 'mongoose'
const Schema = mongoose.Schema

const serie: SchemaDefinition = {
  title: { type: String },
  genres: { type: [String] },
  direction: { type: [String] },
  cast: { type: [String] },
  nationality: { type: String },
  originalChannel: { type: String },
  synopsis: { type: String }
}

const serieSchema = new Schema(serie)

export default mongoose.model('Serie', serieSchema)