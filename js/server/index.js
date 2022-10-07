const Ws = require('ws')

;((Ws) => {

    // 建立 websocket 服务
    // 可以通过：ws:localhost:8000 访问
    const server = new Ws.Server({port: 8000})

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        server.on('open', handleOpen)
        server.on('close', handleClose)
        server.on('error', handleError)
        server.on('connection', handleConnection)
    }
    
    function handleOpen() {
        console.log('Websocket open');
    }

    function handleClose() {
        console.log('Websocket close');
    }

    function handleError() {
        console.log('Websocket error');
    }

    function handleConnection (ws) {
        // message 不实在 server 绑定的，只能通过 connection 事件的处理函数绑定
        ws.on('message', handleMessage)
        console.log('Websocket connected');
    }

    function handleMessage (msg) {
        // 把 msg 广播给每一个客户端
        server.clients.forEach(function(c) {
            c.send(msg)
        })
        // 触发前端的 message 事件
    }

    init()
})(Ws)