const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
require("./models/db");

//! built in middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
