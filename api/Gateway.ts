import { Request, Response } from 'express'
import ScrapingService from './services/ScrapingService'

export default {
  async index (request: Request, response: Response): Promise<Response> {
    const data = await ScrapingService.getCategories()
    return response.send(data)
  }
}