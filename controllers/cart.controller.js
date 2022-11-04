const db = require('../models');
const Cart = db.carts;

exports.addToCart = (req, res) => {
  const { user_id, cart_items } = req.body;

  Cart.findOne({ user_id: user_id }).exec((err, cart) => {
    if (err) return res.status(400).json({ err });
    if (cart) {
      const product = cart_items.product;
      const item = cart.cart_items.find((c) => c.product === product);
      let condition, update;

      if (item) {
        condition = { user_id: user_id, 'cart_items.product': product };
        update = {
          $set: {
            'cart_items.$': {
              ...cart_items,
              quantity: item.quantity + cart_items.quantity,
            },
          },
        };
      } else {
        condition = { user_id: user_id };
        update = {
          $push: {
            cart_items: cart_items,
          },
        };
      }
      Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
        if (err) return res.status(400).json({ err });
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      const cart = new Cart({
        user_id: user_id,
        cart_items: cart_items,
      });

      cart.save((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  const id = req.params.id;
  Cart.findOne({ user: id })
    .populate('cart_items.product', '_id')
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cart_items = {};
        cart.cart_items.forEach((item, index) => {
          cart_items[item.product.toString()] = {
            _id: item.product.toString(),
            qty: item.quantity,
          };
        });
        res.status(200).json({ cart_items });
      }
    });
  //}
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  if (productId) {
    Cart.updateMany(
      { user_id: id },
      {
        $pull: {
          cart_items: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cart.findById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.userCarts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cart.find();
    const user_cart = result.filter((item) => item.user_id === id);
    res.send(user_cart);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cart.findByIdAndRemove(id);
    if (!result) {
      res.status(404).send({
        message: 'Product Cart Not Found',
      });
    }
    res.send({
      message: 'Product Cart was delete',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
