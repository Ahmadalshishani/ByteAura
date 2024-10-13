const { pool } = require("../models/db");

//! insert a product to the web by admin

const insertProduct = (req, res) => {
  const { image, title, description, price, category_id } = req.body;
  pool
    .query(
      "INSERT INTO products (image,title,description,price,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING * ;",
      [image, title, description, price, category_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Product have been inserted",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// get all products for main page

const getAllProducts = (req, res) => {
  pool
    .query(`SELECT * FROM products WHERE is_deleted=0;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All products",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// get products by category id

const getProductsByCategoryId = (req, res) => {
  const categoryId = req.params.id;
  console.log(req.params.id);

  pool
    .query(
      `SELECT * FROM products WHERE category_id=${categoryId} AND is_deleted=0 `
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All products in the category",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// update products by admin
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { title, description, price } = req.body;
  console.log(title);
  console.log(productId);
  pool
    .query(
      `UPDATE products SET title = COALESCE($1,title), description = COALESCE($2, description),price=COALESCE($3,price) WHERE id = $4 RETURNING *;`,
      [title, description, price, productId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "producte have been updated",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//Delete product by admin

const deleteProduct = (req, res) => {
  const productId = req.params.id;
  pool
    .query(`UPDATE products SET is_deleted=1 WHERE id=$1 RETURNING *`, [
      productId,
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "producte have been deleted",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
      console.log(err);
    });
};

//get product by id
const getProductById = (req, res) => {
    const productId = req.params.id;
    console.log(req.params.id);
  
    pool
      .query(`SELECT * FROM products WHERE id=${productId}`)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `products with id:${productId}`,
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };
