const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log('this test-api app run on port', port)
})