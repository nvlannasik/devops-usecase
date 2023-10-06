require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../config/global_config");
const connection = mongoose.createConnection(config.get("/db/mongo/url"));
const { v4: uuidv4 } = require("uuid");

const OrderSchema = new mongoose.Schema(
  {
    order_uid: {
      type: String,
      default: uuidv4,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        product_uid: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: String,
          required: true,
        },
      },
    ],
    customer: {
      type: String,
    },
    emailCustomer: {
      type: String,
    },
    shippingAddress: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    payment: {
      type: String,
      default: "cash",
    },
  },
  {
    versionKey: false,
  }
);

const Order = connection.model("Order", OrderSchema);
module.exports = Order;
