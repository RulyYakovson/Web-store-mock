function makeHandleEvent(client, clientManager, chatroomManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function (resolve, reject) {
      const res = getter()
      return res
        ? resolve(res)
        : reject(rejectionMessage)
    })
  }

  function ensureUserSelected(userId) {
    return ensureExists(
      () => clientManager.getUserByClientId(userId),
      'select user first'
    )
  }

  function ensureValidChatroom(chatroomName) {
    return ensureExists(
      () => chatroomManager.getChatroomByName(chatroomName),
      `invalid chatroom name: ${chatroomName}`
    )
  }

  function ensureValidChatroomAndUserSelected(chatroomName, userId) {
    return Promise.all([
      ensureValidChatroom(chatroomName),
      ensureUserSelected(userId)
    ])
      .then(([chatroom, user]) => Promise.resolve({ chatroom, user }))
  }

  function handleEvent(chatroomName, userId, createEntry) {
    return ensureValidChatroomAndUserSelected(chatroomName, userId)
      .then(function ({ chatroom, user }) {
        // append event to chat history
        const entry = { user, ...createEntry() }
        chatroom.addEntry(entry)

        // notify other clients in chatroom
        chatroom.broadcastMessage({ chat: chatroomName, ...entry })
        return chatroom
      })
  }

  return handleEvent
}

module.exports = function (client, clientManager, chatroomManager) {
  const handleEvent = makeHandleEvent(client, clientManager, chatroomManager)

  function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName))
      return callback('user is not available')

    const user = clientManager.getUserByName(userName)
    clientManager.registerClient(client, user)

    return callback(null, user)
  }

  function handleJoin({ chatroomName, userId } = {}, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` })

    handleEvent(chatroomName, userId, createEntry)
      .then(function (chatroom) {
        // add member to chatroom
        chatroom.addUser(client)

        // send chat history to client
        callback(null, chatroom.getChatHistory())
      })
      .catch(callback)
  }

  function handleLeave({ chatroomName, userId } = {}, callback) {
    const createEntry = () => ({ event: `left ${chatroomName}` })

    handleEvent(chatroomName, userId, createEntry)
      .then(function (chatroom) {
        // remove member from chatroom
        chatroom.removeUser(client.id)

        callback(null)
      })
      .catch(callback)
  }

  function handleMessage({ chatroomName, userId, message } = {}, callback) {
    const createEntry = () => ({ message })

    handleEvent(chatroomName, userId, createEntry)
      .then(() => callback(null))
      .catch(callback)
  }

  function handleGetChatrooms(_, callback) {
    return callback(null, chatroomManager.serializeChatrooms())
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, clientManager.getAvailableUsers())
  }

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  }
}
