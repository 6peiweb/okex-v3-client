const http   = require('http')
const path   = require('path')

const Koa    = require('koa')
const static = require('koa-static')

const app = new Koa()
const PORT = 1113

app.use(static(path.join( __dirname,  './public')))

module.exports = {
  app
}
