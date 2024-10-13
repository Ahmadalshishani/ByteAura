const {pool}= require("../models/db")

// create new category

const createNewCategory = (req, res) => {
    const { image, title } = req.body;
  
    pool
      .query(`INSERT INTO categories (image,title) VALUES ($1,$2) RETURNING *;`, [
        image,
        title,
      ])
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `category created successfully`,
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server error`,
          err: err.message,
        });
      });
  };
  
// get all categories

  const getAllCategories = (req, res) => {
    pool
      .query(`SELECT * FROM categories  a WHERE a.is_deleted=0;`)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "All categories",
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
  