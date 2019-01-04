const { PublicClient } = require('@okfe/okex-node')

const client = new PublicClient('https://www.okex.me')

const futures = client.futures()

const getTicker = async (index, ticker) => {
  const instrumentKey = getInstrumentKey(ticker)[index]
  console.log(instrumentKey)
  const response = await futures.getTicker(instrumentKey)
  console.log(response)
  return response
}

const getInstrumentKey = (ticker) => {
  return [
    `${ticker}-USD-190104`,
    `${ticker}-USD-190111`,
    `${ticker}-USD-190329`
  ]
}

module.exports = {
  getTicker
}