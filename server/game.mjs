import {io} from './connection.mjs'
import {solve_letters} from './solver.mjs'

const vowels = 'aeiouy'
const consonants = 'bcdfghjklmnpqrstvwxz'
let letters = []
let availableWords = []
let validatedPlayerWords = []
let allPlayerWords = []
let countingResult = false
let status = false

io.on('connection', socket => {
  io.emit('players', io.engine.clientsCount)
  io.emit('updateGameStatus', status)
  
  socket.on('disconnect', reason => {
    io.emit('players', io.engine.clientsCount)
  })
  
  socket.on('pushWord', word => {
    allPlayerWords.push(word)
    
    if (availableWords.indexOf(word) !== -1) {
      validatedPlayerWords.push(word)
    }
    
    if (!countingResult) {
      countingResult = setTimeout(function () {
        validatedPlayerWords.sort(function (a, b) {
          return b.length - a.length;
        })
        
        io.emit('roundResults', validatedPlayerWords, allPlayerWords)
      }, 1500)
    }
  })
})


setInterval(() => {
  status = !status
  
  if (status) {
    countingResult = false
    letters = []
    availableWords = []
    validatedPlayerWords = []
    allPlayerWords = []
    
    
    const numberOfVowels = Math.floor(Math.random() * 3) + 3
    const numberOfConsonants = 9 - numberOfVowels
    
    for (let i = 0; i < numberOfVowels; i++) {
      letters.push(vowels.charAt(Math.floor(Math.random() * vowels.length)))
    }
    
    for (let i = 0; i < numberOfConsonants; i++) {
      letters.push(consonants.charAt(Math.floor(Math.random() * consonants.length)))
    }
    
    letters.sort(function () {
      return .5 - Math.random();
    })
    
    availableWords = solve_letters(letters.join(''));
    
    io.emit('updateLetters', letters, availableWords)
  }
  
  io.emit('updateGameStatus', status)
  
}, 5000)

