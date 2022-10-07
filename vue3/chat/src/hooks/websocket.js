import { WS_ADDRESS } from "../configs";

function useWebsocket (handleMessage) {
    const ws = new WebSocket(WS_ADDRESS);

    const init = () => {
        bindEvent()
    }

    function bindEvent () {
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }

    
    function handleOpen(e) {
        console.log('Websocket open');
        username = storage.getItem('username')
        if(!username) {
            location.href = 'entry.html'
            return;
        }
    }

    function handleClose(e) {
        console.log('Websocket close');
    }

    function handleError(e) {
        console.log('Websocket error');
    }

    init()

    return ws
}

export default useWebsocket