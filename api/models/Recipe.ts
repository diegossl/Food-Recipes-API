import mongoose, { SchemaDefinition } from 'mongoose'
const Schema = mongoose.Schema

const recipe: SchemaDefinition = {
  ingredients: { type: String },
  preparation: { type: String },
  additionalInformation: { type: String },
  category: { type: String },
  subcategory: { type: String }
}

const recipeSchema = new Schema(recipe)

export default mongoose.model('Recipe', recipeSchema)