import mongoose from 'mongoose'
const Schema = mongoose.Schema

const recipe = {
  category: { type: String },
  subcategories: { type: [String] }
}

const recipeSchema = new Schema(recipe)

export default mongoose.model('Recipe', recipeSchema)