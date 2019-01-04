const http   = require('http')
const path   = require('path')

const Koa    = require('koa')
const static = require('koa-static')
const router = require('koa-router')()

const { getTicker } = require('./okex-v3-api')

const app = new Koa()

router.get('/v3/ticker/:cycle/:ticker', async ctx => {
  const cycle  = ctx.params.cycle
  const ticker = ctx.params.ticker

  const data = await getTicker(cycle, ticker)

  ctx.body = data
})

app.use(router.routes())
app.use(static(path.join( __dirname,  './public')))

module.exports = {
  app
}
