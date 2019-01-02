setInterval(() => {
  require('request')('https://www.okex.me/api/futures/v3/instruments/BTC-USD-190329/ticker', (error, response, body) => {
    try {
      console.log(`时间：${new Date().toLocaleTimeString()}，价格：${JSON.parse(body).last}`)
    } catch(e) {
      console.log(`${e}`)
    }
  })
}, 1000)