var express = require ('express')
var app = express()
//用 http 模块创建 server
var server = require('http').createServer(app)
// 创建服务端socket
var io = require('socket.io')(server)

var userNo = 0
io.on('connect',function(socket){
    // socket 当前连接的用户
    var user = (++userNo)
    console.log(user + ':上线了')
    socket.on('disconnect',function(){
        console.log(user+ ':--------下线了')
    })
    //监听客户端的消息,事件名可以自己定义
    socket.on('msg-from-client',function(data){
        console.log(user+ ":" +data)
        //向客户端法消息
       io.emit("msg-from-server",user+':'+data)
    })
})
app.use(express.static('public'))
server.listen('8000',function(){
    console.log('server is running on 8000')
})