const { PublicClient } = require('@okfe/okex-node')

const { getInstrumentId } = require('./src/util')
const { sendMail } = require('./src/email')

const client = new PublicClient('https://www.okex.me')

const futures = client.futures()

const getTicker = async () => {
  const instrumentId = getInstrumentId('BTC').Quarter
  const response = await futures.getTicker(instrumentId)
  return response
}

const WebSocketServer = require('ws').Server

const ws = new WebSocketServer({port: 8080})

ws.on('connection', (socket) => {
  console.log(`websocket 连接成功...`)
  socket.on('message', async (msg) => {
    try {
      const data = await getTicker()
      console.log(data)
      socket.send(JSON.stringify(data))
    } catch {
      socket.send('{"last": "timeout"}')
    }
  })
  
})
