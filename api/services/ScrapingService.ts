import Axios, { AxiosResponse } from 'axios'
import ISerie from '../interfaces/ISerie'
import Cheerio from 'cheerio'

const BaseUrl = 'http://www.adorocinema.com'

class ScrapingService {
  public async getSeries (pageLinks: Array<string>) {
    const response: Array<string> = []
    for await (const pageLink of pageLinks) {
      const pageData: AxiosResponse = await Axios.get(`${pageLink}`)
      const $: CheerioStatic = Cheerio.load(pageData.data)

      const pageLinks: Array<string> = $('.gd-col-middle > ul')
      .find('.mdl')
      .map((index: number, serie: CheerioElement) => {
        const pageLinks: string | undefined = $(serie).find('a').attr('href')
        return pageLinks
      }).get()

      response.push(...pageLinks)
    }
    return response
  }

  public async getSeriesPageLinks (): Promise<string[]> {
    const pageData: AxiosResponse = await Axios.get(`${BaseUrl}/series-tv`)
    const $: CheerioStatic = Cheerio.load(pageData.data)

    const maxNumPages: string = $('.pagination-item-holder').find(':last-child').text()
    const numLoop: number = Math.trunc(parseInt(maxNumPages) / 15) + 1

    const pageLinks: Array<string> = []

    for (let index = 1; index <= numLoop; index++) {
      const link = `${BaseUrl}/?page=${index}`
      pageLinks.push(link)
    }

    return pageLinks
  }
}

export default new ScrapingService()