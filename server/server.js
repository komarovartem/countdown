import { http } from "./connection.mjs"
import './game.mjs'

http.listen(3000, '192.168.1.103', () => {
  console.log('listening 3000')
})