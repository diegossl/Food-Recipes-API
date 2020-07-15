import Axios, { AxiosResponse } from 'axios'
import IGenre from '../interfaces/IGenre'
import ISerie from '../interfaces/ISerie'
import Cheerio from 'cheerio'

const BaseUrl = 'http://www.adorocinema.com'

class ScrapingService {
  public async getSeriesInfo (seriesList) {
  }

  public async getSeriesPageLinks (genresList: IGenre[]) {
    const links = genresList.map(async (genre: IGenre) => {
      const pageData: AxiosResponse = await Axios.get(`${BaseUrl}${genre.genrePageLink}`)
      const $: CheerioStatic = Cheerio.load(pageData.data)
      const numPage: number = Math.trunc(genre.numSeries / 15) + 1
      const seriesLinks = $('.gd-col-middle > ul')
        .find('.mdl')
        .map((index: number, serie: CheerioElement) => {
          const serieLink: string | undefined = $(serie)
            .find('.meta > .content-title > a')
            .attr('href')
          return serieLink
        }).get()
    })
  }

  public async getGenres (): Promise<IGenre[]> {
    const pageData: AxiosResponse = await Axios.get(`${BaseUrl}/series-tv`)
    const $: CheerioStatic = Cheerio.load(pageData.data)
    const genres: IGenre[] = $('.filter-entity-desktop > div:first-child')
      .find('li')
      .map((index: number, genre: CheerioElement) => {
        const numSeries: string = $(genre).find('span').text().replace(/([()])/g,'')
        const genrePageLink: string | undefined = $(genre).find('a').attr('href')
        return {
          numSeries: Number(numSeries),
          genrePageLink: genrePageLink
        }
      }).get()
    return genres
  }
}

export default new ScrapingService()