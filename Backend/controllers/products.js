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
      .query(`SELECT * FROM products WHERE category_id=${categoryId} AND is_deleted=0 `)
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