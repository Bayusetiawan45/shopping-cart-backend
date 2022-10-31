module.exports = (app) => {
  const users = require('../controllers/user.controller')
  const router = require('express').Router()

  router.post('/register', users.register)
  router.post('/login', users.login)
  router.get('/:id', users.findOne)
  router.get('/', users.findAll)
  router.put('/:id', users.update)
  router.delete('/:id', users.delete)

  app.use('/api/users', router)
}