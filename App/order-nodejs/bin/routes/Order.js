const Order = require("../models/Order");
const router = require("express").Router();
const axios = require("axios");
const logger = require("../utils/logger/log");
const verifyToken = require("../utils/validation/token_validation");
require("dotenv").config();

//ADD NEW ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      orderNumber: req.body.orderNumber,
      orderTotal: req.body.orderTotal,
      orderItems: req.body.orderItems,
      customer: req.user.LastName,
      emailCustomer: req.user.Email,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      payment: req.body.payment,
    });

    const savedOrder = await order.save({}, { _id: 0, __v: 0 });

    res.status(200).json({
      status: "success",
      message: "Order has been saved successfully",
      data: savedOrder,
    });

    //UPDATE PRODUCT QUANTITY
    const orderItems = req.body.orderItems;
    orderItems.forEach(async (item) => {
      const product = await axios.get(
        `${process.env.HOST_SERVICES_PRODUCT}/v1/product/${item.product_uid}`,
        {
          headers: {
            "auth-token": req.headers["auth-token"],
          },
        }
      );

      const productQuantity = product.data.data.quantity;
      const newQuantity = productQuantity - item.quantity;

      await axios.put(
        `${process.env.HOST_SERVICES_PRODUCT}/v1/product/${item.product_uid}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            "auth-token": req.headers["auth-token"],
          },
        }
      );
    });
    logger.info("Order has been saved successfully");
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

//GET ALL ORDERS
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      message: "Orders has been retrieved successfully",
      data: orders,
    });
    logger.info("Orders has been retrieved successfully");
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

//GET AN ORDER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ order_uid: req.params.id });
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Order has been retrieved successfully",
      data: order,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

//UPDATE AN ORDER
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ order_uid: req.params.id });
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    const updatedOrder = await Order.updateOne(
      { order_uid: req.params.id },
      {
        $set: {
          orderNumber: req.body.orderNumber,
          orderTotal: req.body.orderTotal,
          orderItems: req.body.orderItems,
          customer: req.body.customer,
          emailCustomer: req.body.emailCustomer,
          shippingAddress: req.body.shippingAddress,
          orderStatus: req.body.orderStatus,
          payment: req.body.payment,
          updatedAt: Date.now(),
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Order has been updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

//DELETE AN ORDER
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ order_uid: req.params.id });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    await Order.deleteOne({ order_uid: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Order has been deleted successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
