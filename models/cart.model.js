module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    product_id: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    total_payment: {
      type: Number,
      required: true,
      trim: true,
    },
  }, {timestamps: true})

  schema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
  })


  const Cart = mongoose.model("carts", schema);
  return Cart
}