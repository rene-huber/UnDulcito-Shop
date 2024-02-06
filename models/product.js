import { Schema, model, models } from "mongoose"

const ProductSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: String,
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  productPhotoPaths: [{type: String}]
})

const Product = models.Product || model("Product", ProductSchema)
export default Product