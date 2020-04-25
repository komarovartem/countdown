import { http, app, express } from "./connection.mjs"
import path from 'path'
import './game.mjs'

// http.listen(3000, '192.168.1.103', () => {
//   console.log('listening 3000')
// })

app.use(express.static(path.resolve() + '/client/dist'))
app.get('/', (req, res) => res.sendfile(path.resolve() + '/client/dist/index.html'))

http.listen(3000, () => {
  console.log(3000 + ' port is on')
})