import MongoDB from '../config/MongoDB'
import Serie from './models/Serie'
import { Document } from 'mongoose'
import { Request, Response } from 'express'
import ISerieInfo from './interfaces/ISerieInfo'
import ScrapingService from './services/ScrapingService'

export default {
  async getSeries (request: Request, response: Response): Promise<Response> {
    await MongoDB.getConnection()
    try {
      const seriesFound: Document[] = await Serie.find({})
      if (seriesFound) {
        return response.status(200).send(seriesFound)
      }
      const series: ISerieInfo[] = await ScrapingService.getSeriesInfo()
      await Serie.create(series)
      return response.status(200).send(series)
    } catch (error) {
      return response.status(500).send('Internal server error')
    }
  }
}