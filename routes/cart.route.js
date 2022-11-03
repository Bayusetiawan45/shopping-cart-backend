module.exports = (app) => {
  const carts = require('../controllers/cart.controller')
  const router = require('express').Router()

  router.post('/', carts.addToCart)
  router.get('/', carts.findAll)
  router.get('/:id', carts.findOne)
  router.get('/user-cart/:id', carts.userCarts)
  router.delete('/:id', carts.delete)

  app.use('/api/carts', router)
}