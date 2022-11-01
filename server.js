const express = require('express')
const cors = require('cors')
const connectDB = require('./utilities/connectDB')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

connectDB()

app.get('/', Middleware ,(req, res) => {
  res.json({
    message: 'Welcome to shopping cart backend'
  })
})

require('./routes/product.route')(app)
require('./routes/user.route')(app)

function Middleware(res, res, next) {
  console.log('middleare logged')
  next()
}

app.listen(port, () => {
  console.log(`Listening or port: ${port}`);
})
