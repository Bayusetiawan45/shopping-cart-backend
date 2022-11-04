module.exports = (app) => {
  const carts = require('../controllers/cart.controller')
  const router = require('express').Router()

  router.post('/add-to-cart', carts.addToCart)
  router.delete('/remove-from-cart/:productId', carts.removeFromCart)
  router.get('/:id', carts.findOne)
  router.get('/user-cart/:id', carts.userCarts)
  router.delete('/:id', carts.delete)
  router.get('/get-cart-list/:id', carts.getCartItems)

  app.use('/api/carts', router)
}