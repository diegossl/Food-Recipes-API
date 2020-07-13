export default interface IRecipe {
  ingredients: Array<string>
  preparation: Array<string>
  additionalInformation?: string
  category: string
  subcategory: string
}