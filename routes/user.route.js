module.exports = (app) => {
  const users = require('../controllers/user.controller')
  const router = require('express').Router()

  router.post('/register', users.register)
  router.post('/login', users.login)
  router.get('/:id', users.findOne)
  router.get('/', Middleware, users.findAll)
  router.put('/:id', users.update)
  router.delete('/:id', users.delete)

  function Middleware(res, res, next) {
    console.log('midleware login')
    next()
  }

  app.use('/api/users', router)
}