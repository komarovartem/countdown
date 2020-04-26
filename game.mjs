import {io} from './connection.mjs'
import {solve_letters} from './solver.mjs'

const vowels = 'aeiouy'
const consonants = 'bcdfghjklmnpqrstvwxz'
let letters = []
let availableWords = []
let validatedPlayerWords = []
let allPlayerWords = []
let status = false
let amountOfBots = 0
let roundTime = 51
let currentRoundSecond = 51

io.on('connection', socket => {
  io.emit('players', io.engine.clientsCount + amountOfBots)
  io.emit('updateGameStatus', status)
  io.emit('currentRoundSecond', currentRoundSecond)
  
  socket.on('disconnect', reason => {
    io.emit('players', io.engine.clientsCount + amountOfBots)
  })
  
  socket.on('pushWord', word => {
    allPlayerWords.push(word)
    
    if (availableWords.indexOf(word) !== -1) {
      validatedPlayerWords.push(word)
    }
  })
})

const resetVariables = () => {
  letters = []
  availableWords = []
  validatedPlayerWords = []
  allPlayerWords = []
}

const runBots = () => {
  amountOfBots = Math.floor(Math.random() * 7) + 4
  const botWords = availableWords.filter(word => word.length > 2 && word.length < 5)
  
  io.emit('players', io.engine.clientsCount + amountOfBots)
  
  for (let i = 1; i <= amountOfBots; i++) {
    const randomBotWord = botWords[Math.floor(Math.random() * botWords.length)]
    allPlayerWords.push(randomBotWord)
    validatedPlayerWords.push(randomBotWord)
  }
}

const generateNewLetters = () => {
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
  
  // rerun random letters to make sure we have a good letters for big variety of words
  if (Array.isArray(availableWords) && availableWords[0] && availableWords[0].length < 8) {
    letters = []
    availableWords = []
    generateNewLetters()
  }
}

const gameOn = () => {
  resetVariables()
  generateNewLetters()
  runBots()
  
  // send letters before starting the game to make some time for animation
  io.emit('updateLetters', letters, availableWords)
  
  setTimeout(() => {
    io.emit('updateGameStatus', true)
  }, 6000)
  
  // pause game after 30s
  setTimeout(() => {
    pauseGame()
  }, 36000)
}

const pauseGame = () => {
  io.emit('updateGameStatus', false)
  
  // send round results
  setTimeout(function () {
    validatedPlayerWords.sort(function (a, b) {
      return b.length - a.length;
    })
    io.emit('roundResults', validatedPlayerWords, allPlayerWords)
  }, 3000)
  
  // start game after 15s after pause
  setTimeout(() => {
    gameOn()
  }, 15000)
}

setInterval(() => {
  if (currentRoundSecond > 0) {
    currentRoundSecond--
  } else {
    currentRoundSecond = roundTime
  }
}, 1000)

gameOn()

