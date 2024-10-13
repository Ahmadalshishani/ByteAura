const express = require("express");

const { createNewCategory ,getAllCategories, deleteCategory} = require("../controllers/categorys");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
// Create categories router

const categoriesRouter = express.Router();

categoriesRouter.post("/",authentication,authorization("admin"),createNewCategory);
categoriesRouter.get("/",getAllCategories)
categoriesRouter.delete("/:id",authentication,authorization("admin"),deleteCategory)
module.exports = categoriesRouter;
