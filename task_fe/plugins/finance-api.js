class FinanceClient {
  constructor (axios, apiKey) {
    this.axios = axios
    this.apiKey = apiKey
    this.baseUrl = 'https://www.alphavantage.co/query'
  }

  async makeRequest () {
    const uri = `${this.baseUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=${this.apiKey}`

    return await this.axios
      .get(uri)
      .then(res => res.data['Realtime Currency Exchange Rate'])
  }
}

export default ({ $axios, app }, inject) => {
  const finance = new FinanceClient($axios, app.context.env.FINANCE_API_KEY)
  inject('finance', finance)
}
