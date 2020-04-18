const express = require('express')
const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)

server.use('/assets', express.static(__dirname + '/assets'))
server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('listening 3000')
})