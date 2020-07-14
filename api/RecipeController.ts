import { Document } from 'mongoose'
import Recipe from './models/Recipe'
import MongoDB from '../config/MongoDB'
import IRecipe from './interfaces/IRecipe'
import { Request, Response } from 'express'
import ScrapingService from './services/ScrapingService'

export default {
  async getAllRecipes (request: Request, response: Response): Promise<Response> {
    await MongoDB.getConnection()
    try {
      // const recoveredRecipes: Document[] = await Recipe.find({})
      // if (recoveredRecipes.length != 0) {
      //   return response.status(200).send(recoveredRecipes)
      // }
      const collectedRecipes: IRecipe = await ScrapingService.getRecipes()
      //await Recipe.create(collectedRecipes)
      return response.status(200).send(collectedRecipes)
    } catch (error) {
      return response.status(500).send('Internal server error')
    }
  }
}