import Axios, { AxiosResponse } from 'axios'
import Cheerio from 'cheerio'

const BaseUrl = 'https://www.tudogostoso.com.br'

class ScrapingService {
  public async getRecipes (): Promise<void> {
    // const categories: Cheerio[] = await this.getCategories()
    return
  }

  private async getCategories (): Promise<Cheerio[]> {
    const categoryData: AxiosResponse = await Axios.get(`${BaseUrl}/categorias`)
    const $: CheerioStatic = Cheerio.load(categoryData.data)
  
    const data: Cheerio[] = $('.page-tags > .row')
      .map((index: number, category: CheerioElement) => {
        const title: string = $(category).find('h2').text().replace(/\n/g, '')
        const links: Cheerio[] = $(category)
          .find('h3')
          .map((index: number, subcategory: CheerioElement) => {
            const link: string | undefined = $(subcategory).find('a').attr('href')
            return link
          }).get()
        const response: unknown = { category: title, subcategories: links }
        return response
    }).get()
    
    return data
  }
}

export default new ScrapingService()