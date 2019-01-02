const http   = require('http')
const https  = require('https')
const fs     = require('fs')
const path   = require('path')

const Koa    = require('koa')
const static = require('koa-static')
const enforceHttps = require('koa-sslify')

const app = new Koa()
const PORT = 80
const SSLPORT = 443


app.use(enforceHttps())

app.use(static(path.join( __dirname,  './public')))

const httpServer = http.createServer(app.callback())
const httpsServer = https.createServer({
  key: fs.readFileSync('./https/www.liupei.xyz.key'), 
  cert: fs.readFileSync('./https/www.liupei.xyz.pem')
}, app.callback())

httpServer.listen(PORT, () => console.log('HTTP Server is running on: http://localhost:%s', PORT))

httpsServer.listen(SSLPORT, () => console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT))
