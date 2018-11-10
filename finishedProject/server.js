// Mock DB
const mockDB = []

// Middlewares
let requestNumber = 1
const logger = (req, res, next) => {
  console.log('Request #', requestNumber)
  requestNumber++
  next()
}

const addTimestamp = (req, res, next) => {
  const date = new Date().toLocaleString()
  req.body.created = date
  next()
}

const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const app = express()
const port = 3000
const saltRounds = 10

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(logger)
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    console.log(req.body)
    req.body.password = hash
    mockDB.push(req.body)
    console.log(req.body)
    console.log('==>mockDB', mockDB)
    res.render('list', {campers: mockDB})
  });
})



// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`))
