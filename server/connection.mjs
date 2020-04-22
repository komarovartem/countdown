import Express from 'express'
import Http from 'http'
import Io from 'socket.io'

export const express = Express()
export const http = Http.Server(express)
export const io = Io(http)
