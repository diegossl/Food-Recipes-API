import MongoDB from '../config/MongoDB'
import { Request, Response } from 'express'
import IGenre from './interfaces/IGenre'
import ScrapingService from './services/ScrapingService'

export default {
  async getSeries (request: Request, response: Response): Promise<Response> {
    await MongoDB.getConnection()
    try {
      const genresList: IGenre[] = await ScrapingService.getGenres()
      const seriesPageLinks = await ScrapingService.getSeriesPageLinks(genresList)
      return response.status(200).send(genresList)
    } catch (error) {
      return response.status(500).send('Internal server error')
    }
  }
}