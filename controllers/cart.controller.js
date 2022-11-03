const db = require('../models');
const Cart = db.carts;

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity, total_payment } = req.body;
    const cart = new Cart({
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
      total_payment: total_payment,
    });
    const result = await cart.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Cart.find()
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Cart.findById(id)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

exports.userCarts = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Cart.find()
    const user_cart = result.filter((item) => item.user_id === id)
    res.send(user_cart)
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Cart.findByIdAndRemove(id)
    if (!result) {
      res.status(404).send({
        message: "Product Cart Not Found"
      })
    }
    res.send({
      message: "Product Cart was delete"
    }) 
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}