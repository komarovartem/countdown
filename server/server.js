const express = require('express')()
const http = require('http').Server(express)
const io = require('socket.io')(http)
let players = 0

http.listen(3000, () => {
  console.log('listening 3000')
})

io.on('connect', socket => {
  players++
  socket.emit('players', players)
})

io.on('disconnect', (reason) => {
  players = players - 1
  socket.emit('players', players)
})