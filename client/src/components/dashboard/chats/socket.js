const io = require('socket.io-client')

export default function () {
    const socket = io.connect('http://localhost:8080')

    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
    })

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(chatroomName, userId, cb) {
        socket.emit('join', {chatroomName, userId}, cb)
    }

    function leave(chatroomName, userId, cb) {
        socket.emit('leave', {chatroomName, userId}, cb)
    }

    function message(chatroomName, msg, userId, cb) {
        socket.emit('message', {chatroomName, userId, message: msg}, cb)
    }

    function getChatrooms(cb) {
        socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(cb) {
        socket.emit('availableUsers', null, cb)
    }

    return {
        register,
        join,
        leave,
        message,
        getChatrooms,
        getAvailableUsers,
        registerHandler,
        unregisterHandler,
        socket
    }
}

