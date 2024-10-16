const {pool}= require("../models/db")

// create new category

const createNewCategory = (req, res) => {
    const { image, title } = req.body;
  
    pool
      .query(`INSERT INTO categorys (image,title) VALUES ($1,$2) RETURNING *;`, [
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
        console.log(err);
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
      .query(`SELECT * FROM categorys  a WHERE a.is_deleted=0;`)
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
  

  //Delete catergory by admin

const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    pool
      .query(`UPDATE categorys SET is_deleted=1 WHERE id=$1 RETURNING *`, [
        categoryId,
      ])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "category have been deleted",
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


  //! exporte the api to the route wanted
  module.exports = {
    createNewCategory,
    getAllCategories,
    deleteCategory
  }