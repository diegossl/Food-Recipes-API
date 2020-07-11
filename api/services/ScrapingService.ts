import Axios from 'axios'
import Cheerio from 'cheerio'

const url = 'https://www.tudogostoso.com.br/categorias'

export default {
  async getCategories (): Promise<unknown> {
    const pageData = await Axios.get(url)
    const $ = Cheerio.load(pageData.data)
    const title = $('.box-title').text()
    return { title: title }
  }
}