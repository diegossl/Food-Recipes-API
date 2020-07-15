import MongoDB from '../config/MongoDB'
import { Request, Response } from 'express'
import ISerie from './interfaces/ISerie'
import ScrapingService from './services/ScrapingService'

export default {
  async getSeries (request: Request, response: Response): Promise<Response> {
    await MongoDB.getConnection()
    try {
      const pageLinks: Array<string> = await ScrapingService.getSeriesPageLinks()
      const seriesList = await ScrapingService.getSeries(pageLinks)
      return response.status(200).send(seriesList)
    } catch (error) {
      return response.status(500).send('Internal server error')
    }
  }
}