const http   = require('http')
const path   = require('path')

const Koa    = require('koa')
const request = require('request')
const cors = require('koa2-cors')
const static = require('koa-static')
const router = require('koa-router')()

const { getTicker, getBook } = require('./okex-v3-api')

const app = new Koa()

router.get('/v3/ticker/:cycle/:ticker', async ctx => {
  const cycle  = ctx.params.cycle
  const ticker = ctx.params.ticker

  const data = await getTicker(cycle, ticker)

  ctx.body = data
})

router.get('/v3/book/:cycle/:ticker', async ctx => {
  const cycle  = ctx.params.cycle
  const ticker = ctx.params.ticker

  const data = await getBook(cycle, ticker)

  ctx.body = data
})

const promise = new Promise((resolve, reject) => {
  request({
    url: 'https://app.mokahr.com/api/user/recommendation/applications',
      headers: {
        'Cookie': 'acw_tc=7b39758515631807549776093e9637ad0fcbd19b940292733b5eb12ac72b4f; connect.sid=s%3AGZmNyOwy3m4fMmN37SeqLZBYRvELNJ7z.OteHNb094fIsgZ7QSRardPcvRii2nJH0maXbx5dYm1s',
      }
  }, (err, resp) => {
    if (!err) return resolve(resp)
    reject(err)
  })
})

router.get('/api/interview/flow', async ctx => {
  const result = await promise;
  const data = JSON.parse(result.body);
  const bbb = data.filter(item => item.name === ctx.query.name);
  ctx.body = bbb;
})

app.use(cors({
  origin: () => '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.use(static(path.join( __dirname, '../public')))
app.use(router.routes())

module.exports = {
  app
}
