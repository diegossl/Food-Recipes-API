import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const recipe = {
  category: { type: String },
  subcategories: { type: [String] }
}

const recipeSchema = new Schema(recipe)

export default Mongoose.model('Recipe', recipeSchema)