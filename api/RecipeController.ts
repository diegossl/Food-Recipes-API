import { Request, Response } from 'express'
import ScrapingService from './services/ScrapingService'

export default {
  async getRecipes (request: Request, response: Response): Promise<Response> {
    try {
      const data = await ScrapingService.getCategories()
      return response.status(200).send(data)
    } catch (error) {
      return response.status(500).send('Internal server error')
    }
  }
}