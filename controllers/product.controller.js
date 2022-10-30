const db = require('../models')
const Product = db.products

exports.findAll = (req, res) => {
  Product.find()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error while retrieving products"
    })
  })
}

exports.create = (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    images: req.body.images
  })
  product.save(product)
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message || "Some error while create products"
    })
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Product.findById(id)
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message || "Some error while show products"
    })
  })
}

exports.update = (req, res) => {
  const id = req.params.id

  Product.findByIdAndUpdate(id, req.body)
  .then((result) => {
    if (!result) {
      res.status(404).send({
        message: "Product Not Found"
      })
    }

    res.send({
      message: "Product was updated"
    })
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message || "Some error while update products"
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Product.findByIdAndRemove(id)
  .then((result) => {
    if (!result) {
      res.status(404).send({
        message: "Product Not Found"
      })
    }

    res.send({
      message: "Product was deleted"
    })
  })
  .catch((err) => {
    res.status(409).send({
      message: err.message || "Some error while show products"
    })
  })
}
