const { PublicClient } = require('@okfe/okex-node')

const client = new PublicClient('https://www.okex.me')

const futures = client.futures()

const getTicker = async (index, ticker) => {
  const instrumentKey = getInstrumentKey(ticker)[index]
  const response = await futures.getTicker(instrumentKey)
  return response
}

const getInstrumentKey = (ticker) => {
  return [
    `${ticker}-USD-190111`,
    `${ticker}-USD-190118`,
    `${ticker}-USD-190628`
  ]
}

module.exports = {
  getTicker
}