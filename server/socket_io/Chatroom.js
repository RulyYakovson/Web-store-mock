module.exports = function ({ name, image }) {
  const members = new Map()
  let chatHistory = []

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

  function addUser(client) {
    console.log('add user', client.id)
    members.set(client.id, client)
  }

  function removeUser(clientId) {
    console.log('remove user', clientId)
    members.delete(clientId)
  }

  function serialize() {
    return {
      name,
      image,
      numMembers: members.size
    }
  }

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  }
}
