const path   = require('path')
const http   = require('http')
const fs     = require('fs')

const Koa    = require('koa')
const static = require('koa-static')

const app = new Koa()
console.log(path)
const httpsOption = { 
  key : fs.readFileSync('./ssl/www.liupei.xyz.key'), 
  cert: fs.readFileSync('./ssl/www.liupei.xyz.pem')
}

app.use(static(
  path.join( __dirname,  './public')
))

http.createServer(app).listen(80);
https.createServer(httpsOption, app).listen(443);