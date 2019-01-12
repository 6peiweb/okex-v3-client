const { getTicker } = require('./src/okex-v3-api')
const { sendMail } = require('./src/mail-smtp')
const { app } = require('./src/rest')

const PORT = 1113

const WebSocketServer = require('ws').Server

const ws = new WebSocketServer({port: 8080})

ws.on('connection', (socket) => {
  console.log(`Websocket connection succeeded...`)
  socket.on('message', async (msg) => {
    const req = JSON.parse(msg)
    try {
      const data = await getTicker(req.cycle, req.ticker)
      socket.send(JSON.stringify(data))
    } catch {
      socket.send('{"last": "timeout"}')
    }
  })
})

app.listen(PORT, () => console.log(`HTTP Server is running on: http://127.0.0.1:${PORT}`))
