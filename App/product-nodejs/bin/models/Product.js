const mongoose = require("mongoose");
const config = require("../config/global_config");
const connection = mongoose.createConnection(config.get("/db/mongo/url"));
const { v4: uuidv4 } = require("uuid");

const ProductSchema = new mongoose.Schema(
  {
    product_uid: {
      type: String,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

const Product = connection.model("Product", ProductSchema);
module.exports = Product;
