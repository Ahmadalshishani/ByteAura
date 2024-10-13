const express =require("express")
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
require("./models/db");

//! built in middleware
app.use(express.json());
app.use(cors());

// import routes
const userRouter = require("./routes/users");
const productsRouter = require("./routes/products");

//Router Middleware
app.use("/users", userRouter);
app.use("/products",productsRouter)

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
