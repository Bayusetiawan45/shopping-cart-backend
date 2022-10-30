module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    images: {
      type: Array,
      required: true,
    },
  }, {timestamps: true})

  schema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
  })


  const Product = mongoose.model("products", schema);
  return Product
}