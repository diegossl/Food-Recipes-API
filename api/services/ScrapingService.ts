import Axios from 'axios'
import Cheerio from 'cheerio'

const url = 'https://www.tudogostoso.com.br/categorias'

interface DataObject {}

export default {
  async getCategories (): Promise<DataObject> {
    const pageData = await Axios.get(url)
    const $ = Cheerio.load(pageData.data)
    const data: DataObject  = []

    $('.page-tags > .row').map((i, dataBlock) => {
      const link = $(dataBlock).find('h3 > a').attr('href')
      data.push({ link: link })
    }).get()
    
    return data
  }
}