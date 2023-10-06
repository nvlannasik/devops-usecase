const Product = require("../models/Product");
const router = require("express").Router();
const logger = require("../utils/logger/log");
const verifyToken = require("../utils/validation/token_validation");

// CREATE PRODUCT
router.post("/", verifyToken, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      quantity: req.body.quantity,
      status: req.body.status,
    });

    const savedProduct = await product.save();
    res.status(200).json({
      status: "success",
      message: "Product has been created",
      data: savedProduct,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
});

//GET PRODUCT LIST
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({}, { __v: 0, _id: 0 });
    res.status(200).json({
      status: "success",
      message: "Product list has been retrieved",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
});

//GET PRODUCT BY ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne(
      {
        product_uid: req.params.id,
      },
      {
        _id: 0,
        __v: 0,
      }
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product has been retrieved",
      data: product,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
});

//UPDATE PRODUCT
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne(
      {
        product_uid: req.params.id,
      },
      {
        _id: 0,
        __v: 0,
      }
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.updateOne(
      {
        product_uid: req.params.id,
      },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
          image: req.body.image,
          quantity: req.body.quantity,
          status: req.body.status,
          updated_at: Date.now(),
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Product has been updated",
      data: updatedProduct,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
});

//DELETE PRODUCT
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne(
      {
        product_uid: req.params.id,
      },
      {
        _id: 0,
        __v: 0,
      }
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    const deletedProduct = await Product.deleteOne({
      product_uid: req.params.id,
    });

    res.status(200).json({
      status: "success",
      message: "Product has been deleted",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error,
    });
  }
});

module.exports = router;
