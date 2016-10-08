var koa = require('koa')
var router = require('koa-router')()
var send = require('koa-send')

var app = koa()
router.get('/index.html',function* (next) {
    yield send(this,'./index.html')
})

app.use(router.routes())
 .use(router.allowedMethods())

var server = require('http').Server(app.callback())
var     io = require('socket.io')(server)

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', function (data) {
        console.log(data)
    })
})
server.listen(9999)