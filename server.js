const connection =  require('./connection')
const path = require('path')
const game = require('./game')

connection.app.use(connection.express.static(path.resolve() + '/client/dist'))
connection.app.get('/', (req, res) => res.sendfile(path.resolve() + '/client/dist/index.html'))
connection.app.get('/*', (req, res) => res.redirect('/'))

connection.http.listen(3000)

game()