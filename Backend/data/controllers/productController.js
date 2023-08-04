const asyncHandler = require('express-async-handler')
const Product = require('../../models/productModel')
const fs = require('fs');
const path = require('path');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const key = req.query.key
    ? {
      "$or": [
        { name: { $regex: req.query.key, $options: 'i', } },
        { category: { $regex: req.query.key, $options: 'i', } },
      ]
    }
    : {}

  // console.log(req.query.key);
  const products = await Product.find({ ...key })
  const allproducts = await Product.find({})
  if (products.length === 0) {
    res.json(allproducts)
    // console.log("all :" + allproducts);
  } else {
    res.json(products)
    // console.log("product" + products);
  }

})

//@desc fetch product bu search
//@route  GET/api/products/search/:key
// @access Public
const getProductsBySearch = asyncHandler(async (req, res) => {
  const key = req.query.key
  // console.log(key);
  const search = await Product.find({
    category: { $regex: req.params.key, $options: 'i', }
  })
  // "$or": [
  //   { name: { $regex: req.params.key, $options: 'i', } },
  //   { category: { $regex: req.params.key, $options: 'i', } },
  // ]
  // console.log(req.query.key);
  res.json(search)
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const imagePath = path.join(__dirname, '../..', await product.image);
    fs.unlinkSync(imagePath)
    await product.deleteOne()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    registrationNo,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    if (image === product.image) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.registrationNo = registrationNo
      product.category = category
      product.countInStock = countInStock
    } else {
      const imagePath = path.join(__dirname, '../..', await product.image);
      fs.unlinkSync(imagePath)

      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.registrationNo = registrationNo
      product.category = category
      product.countInStock = countInStock
    }


    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  // console.log(rating, comment, req.params.id);
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

module.exports = {
  getProducts,
  getProductsBySearch,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
};
