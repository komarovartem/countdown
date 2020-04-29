const connection =  require('./connection')
const path = require('path')
const game = require('./game')

// http.listen(3000, '192.168.1.103', () => {
//   console.log('listening 3000')
// })

connection.app.use(connection.express.static(path.resolve() + '/client/dist'))
connection.app.get('/', (req, res) => res.sendfile(path.resolve() + '/client/dist/index.html'))

connection.http.listen(3000, () => {
  console.log(3000 + ' port is on')
})

game()