const Express = require('express')
const Http = require('http')
const Io = require('socket.io')

const express = Express
const app = Express()
const http = Http.Server(app)
const io = Io(http)

module.exports = {
  express,
  app,
  http,
  io,
}
