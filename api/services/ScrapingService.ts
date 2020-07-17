import Axios, { AxiosResponse } from 'axios'
import ISerie from '../interfaces/ISerie'
import ISerieInfo from '../interfaces/ISerieInfo'
import Cheerio from 'cheerio'

class ScrapingService {
  public async getSeriesInfo (): Promise<Array<ISerieInfo>> {
    const seriesPages: ISerie[] = await this.getSeriesPages()

    const response: ISerieInfo[] = []

    for await (const seriePage of seriesPages) {
      const pageData: AxiosResponse = await Axios.get(`http://www.adorocinema.com${seriePage}`)
      const $: CheerioStatic = Cheerio.load(pageData.data)

      const title: string = $('.breadcrumb').find('h1').text().trim()
      const nationality: string = $('.meta-body-nationality').find('span:last-child').text().trim()
      const originalChannel: string = $('.gd-col-left').find('.meta-body > :last-child').text().trim()
      const synopsis: string = $('.ovw-synopsis').find('.content-txt').text().trim()
      const direction: string[] = $('.gd-col-left').find('.meta-body-direction > a')
        .map((index: number, genre: CheerioElement) => {
          const text: string = $(genre).text().trim()
            return text
        }).get()
      const cast: string[] = $('.gd-col-left').find('.meta-body-actor > span')
      .map((index: number, genre: CheerioElement) => {
        const text: string = $(genre).text().trim()
          return text
      }).get()
      const genres: string[] = $('.meta-body-info').find('span')
        .map((index: number, genre: CheerioElement) => {
          const text: string = $(genre).text().trim()
          if (text != '/') {
            return text
          }
        }).get()
              
      const data: ISerieInfo = {
        title: title,
        genres: genres,
        direction: direction,
        cast: cast,
        nationality: nationality,
        originalChannel: originalChannel,
        synopsis: synopsis
      }
      response.push(data)
    }
    return response
  }

  private async getSeriesPages (): Promise<ISerie[]> {
    const pageData: AxiosResponse = await Axios.get('http://www.adorocinema.com/series-tv')
    const $: CheerioStatic = Cheerio.load(pageData.data)

    const maxNumPages: string = $('.pagination-item-holder').find(':last-child').text()
    const numLoop: number = parseInt(maxNumPages)
    
    const response: ISerie[] = []

    for (let index = 1; index <= numLoop; index++) {
      const pageData: AxiosResponse = await Axios.get(`http://www.adorocinema.com/series-tv/?page=${index}`)
      const links: ISerie[] = await this.getSerieLinks(pageData)
      response.push(...links)
    }
    return response
  }

  private async getSerieLinks (pageData: AxiosResponse): Promise<ISerie[]> {
    const $: CheerioStatic = Cheerio.load(pageData.data)

    const pageLinks: ISerie[] = $('.gd-col-middle > ul')
    .find('.mdl')
    .map((index: number, serie: CheerioElement) => {
      const pageLinks = $(serie)
        .find('.meta > .content-title > .meta-title > a')
        .attr('href')
      return pageLinks
    }).get()
    return pageLinks
  }
}

export default new ScrapingService()