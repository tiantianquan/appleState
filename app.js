var koa = require('koa')
var router = require('koa-router')()
var send = require('koa-send')
var staticCache = require('koa-static-cache')

var req = require('./req.js')

var app = koa()
router.get('/', function*(next) {
  yield send(this, './index.html')
})

router.get('/state', function*(next) {
  var res = yield req.get()
  res = JSON.parse(res)
  var list = [res.R637['MNFU2CH/A'],
    res.R579['MNFU2CH/A'],
    res.R638['MNFU2CH/A']
  ]

  list = list.map(function(d) {
    return req.format(d)
  })

  this.body = {
    dyc: list[0],
    hl: list[1],
    yh: list[2],
  time:new Date()
  }
  // this.body = {
  //   dyc: true,
  //   hl: false,
  //   yh: true,
  //   time: new Date()
  // }
})


app.use(staticCache('./', {
  maxage: 60 * 60 * 24 * 365,
  dynamic: true,
  gzip: true
}))

app.use(router.routes())
  .use(router.allowedMethods())

var server = require('http').Server(app.callback())

// var io = require('socket.io')(server)
// io.on('connection', function(socket) {
//   socket.emit('news', {
//     hello: 'world'
//   })
//   socket.on('my other event', function(data) {
//     console.log(data)
//   })
// })

server.listen(9999)
