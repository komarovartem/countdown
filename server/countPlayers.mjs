import {io} from './connection.mjs'
import {solve_letters} from './solver.mjs'

const vowels = 'AEIOUY'
const consonants = 'BCDFGHJKLMNPQRSTVWXZ'
const letters = []
let words = []
let status = false

io.on('connection', socket => {
  io.emit('players', io.engine.clientsCount)
  io.emit('updateGameStatus', status)
  
  socket.on('disconnect', reason => {
    io.emit('players', io.engine.clientsCount)
  })
})

setInterval( () => {
  status = !status
  
  if (status) {
    const numberOfVowels = Math.floor(Math.random() * 3) + 3
    const numberOfConsonants = 9 - numberOfVowels
  
    letters.length = 0
    words.length = 0
  
    for ( let i = 0; i < numberOfVowels; i++ ) {
      letters.push(vowels.charAt(Math.floor(Math.random() * vowels.length)))
    }
  
    for ( let i = 0; i < numberOfConsonants; i++ ) {
      letters.push(consonants.charAt(Math.floor(Math.random() * consonants.length)))
    }
  
    letters.sort(function() {
      return .5 - Math.random();
    })
  
    words = solve_letters(letters.join('').toLowerCase());
    
    io.emit('updateLetters', letters, words)
  }
  
  io.emit('updateGameStatus', status)
  
}, 5000)

