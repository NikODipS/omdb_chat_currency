function convertToQuery (obj) {
  return Object.entries(obj)
    .filter(el => !!el[1])
    .map(el => `${el[0]}=${el[1]}`)
    .join('&')
}

class OMDdClient {
  constructor (axios, apiKey, baseUrl) {
    this.axios = axios
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  async search (search, type = null, year = null, page = null) {
    const srcObj = {
      apikey: this.apiKey,
      s: search,
      type,
      y: year,
      page
    }
    return await this.axios
      .get(`${this.baseUrl}?${convertToQuery(srcObj)}`)
      .then(res => ({ query: { ...srcObj, apikey: undefined }, ...res.data }))
  }

  async byImdbId (resultId) {
    const srcObj = {
      apikey: this.apiKey,
      i: resultId,
      plot: 'full'
    }

    return await this.axios
      .get(`${this.baseUrl}?${convertToQuery(srcObj)}`)
      .then(res => res.data)
  }
}

export default ({ $axios, app }, inject) => {
  const omdbApi = new OMDdClient(
    $axios,
    app.context.env.OMDB_API_KEY,
    app.context.env.OMDB_BASE_URL
  )
  inject('omdbApi', omdbApi)
}
