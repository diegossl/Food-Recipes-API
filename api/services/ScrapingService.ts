import Axios, { AxiosResponse } from 'axios'
import IRecipe from '../interfaces/IRecipe'
import Cheerio from 'cheerio'

const BaseUrl = 'https://www.tudogostoso.com.br'

interface Category {
  categoryTitle: string
  subcategoriesLinks: Array<string>
}

class ScrapingService {

  public async getRecipes (): Promise<IRecipe> {
    const categories: Category[] = await this.getCategories()
    categories[0].subcategoriesLinks
      .map(async (link: string) => {
        const categoryData: AxiosResponse = await Axios.get(`${BaseUrl}${link}`)
        const $: CheerioStatic = Cheerio.load(categoryData.data)
        const numPage: string = $('.page-title > .num').text()
        //let numloop = Number(numPage.substr(0, numPage.length - 9)) / 15
      })

    const recipe: IRecipe = {
      ingredients: ['string'],
      preparation: ['string'],
      additionalInformation: 'string',
      category: 'string',
      subcategory: 'string'
    }
    return recipe
  }

  private async getCategories (): Promise<Category[]> {
    const categoryData: AxiosResponse = await Axios.get(`${BaseUrl}/categorias`)
    const $: CheerioStatic = Cheerio.load(categoryData.data)
    const response: Category[] = $('.page-tags > .row')
      .map((index: number, category: CheerioElement) => {
        const categoryTitle: string = $(category).find('h2').text().replace(/\n/g, '')
        const subcategoriesLinks: Array<string> = $(category)
        .find('h3')
        .map((index: number, subcategory: CheerioElement) => {
          const link: string | undefined = $(subcategory).find('a').attr('href')
          return link
        }).get()
        const data: Category = {
          categoryTitle: categoryTitle,
          subcategoriesLinks: subcategoriesLinks
        }
        return data
      }).get()
    return response
  }
  
}

export default new ScrapingService()