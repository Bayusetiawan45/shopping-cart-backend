const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const db = require('./models/index')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true
  })
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((err) => {
    console.log(`Cannot connect to the database, ${err}`);
    process.exit()
  })

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to shopping cart backend'
  })
})

require('./routes/product.route')(app)

app.listen(port, () => {
  console.log(`Listening or port: ${port}`);
})