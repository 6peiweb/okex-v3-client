const { PublicClient } = require('@okfe/okex-node')

const { getInstrumentId } = require('./src/util')
const { sendMail } = require('./src/email')
const { app } = require('./server')

const PORT = 1113

const client = new PublicClient('https://www.okex.me')

const futures = client.futures()

const getTicker = async (ticker) => {
  const instrumentId = getInstrumentId(ticker).Quarter
  const response = await futures.getTicker(instrumentId)
  return response
}

const WebSocketServer = require('ws').Server

const ws = new WebSocketServer({port: 8080})

ws.on('connection', (socket) => {
  console.log(`Websocket connection succeeded...`)
  socket.on('message', async (msg) => {
    console.log(socket)
    try {
      const data = await getTicker(msg)
      socket.send(JSON.stringify(data))
    } catch {
      socket.send('{"last": "timeout"}')
    }
  })
})

app.listen(PORT, () => console.log(`HTTP Server is running on: http://127.0.0.1:${PORT}`))
