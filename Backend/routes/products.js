const express = require("express");
const { insertProduct, getAllProducts, getProductsByCategoryId, updateProduct, deleteProduct,getProductById } = require("../controllers/products");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const productsRouter = express.Router();

// Import products controllers
productsRouter.post("/",authentication,authorization("admin"), insertProduct);
productsRouter.get("/",getAllProducts)
productsRouter.get("/product/:id",getProductById)
productsRouter.get("/:id",getProductsByCategoryId)
productsRouter.put("/:id",authentication,authorization("admin"),updateProduct)
productsRouter.delete("/:id",authentication,authorization("admin"),deleteProduct)

// export to app.js
module.exports = productsRouter;
