const express= require("express")
const {register ,login} = require("../controllers/users")
const userRouter = express.Router();


// Import users controllers
userRouter.post("/register",register);
userRouter.post("/login",login);

//export routes to main app

module.exports = userRouter;
