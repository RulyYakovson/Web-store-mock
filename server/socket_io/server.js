module.exports= (server)=> {
  const io = require('socket.io')(server)

  const ClientManager = require('./ClientManager')
  const ChatroomManager = require('./ChatroomManager')
  const makeHandlers = require('./handlers')

  const chatroomManager = ChatroomManager()
  const clientManager = ClientManager()

  io.on('connection', function (client) {
    const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetChatrooms,
      handleGetAvailableUsers,
      handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager)

    console.log('client connected...', client.id)
    clientManager.addClient(client)

    client.on('register', handleRegister)

    client.on('join', handleJoin)

    client.on('leave', handleLeave)

    client.on('message', handleMessage)

    client.on('chatrooms', handleGetChatrooms)

    client.on('availableUsers', handleGetAvailableUsers)

    client.on('disconnect', function () {
      console.log('client disconnect...', client.id)
      handleDisconnect()
    })

    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })
  })
}
