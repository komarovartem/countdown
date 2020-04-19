const express = require('express')
const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)
const path = require('path')
const players = []

server.use('/assets', express.static(path.resolve('client/assets')))

server.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'))
})

http.listen(3000, () => {
  console.log('listening 3000')
})

io.on('connection', socket => {
  socket.emit('players', players)
})