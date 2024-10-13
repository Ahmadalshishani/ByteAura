const { pool } = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This function creates (new user)
const register = (req, res) => {
  const { username, password, role_id = 2 } = req.body;

  //! Check if email exists
  pool
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "The user already exists",
        });
      }
      //! Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to hash the password",
          });
        }

        // insert the user with the hashed password
        pool
          .query(
            `INSERT INTO users (username , password , role_id) VALUES (LOWER$1,$2,$3)`,
            [username.tolowerCase(), hashedPassword, role_id]
          )
          .then(() => {
            res.status(201).json({
              success: true,
              message: "Account created successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: err.message,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// login api
const login = (req, res) => {
  const { username, password } = req.body;
//! check if the user exist or not

  pool
    .query("SELECT * FROM users WHERE username = LOWER($1)", [username])
    .then(async (result) => {
      if (!(result.rows.length > 0)) {
        return res.status(403).json({
          success: false,
          message: "The username dosen't exist or the password is inncorrect",
        });
      }
      //! compare the password with the hashed password 
      
      try {
        const valid = await bcrypt.compare(password, result.rows[0].password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: "The username dosen't exist or the password is inncorrect",
          });
        }

        // insert the wanted data to the token 
        const payload = {
          userId: result.rows[0].id,
          role: result.rows[0].role_id,
        };
        // create a timeout for the token
        const option = {
          expiresIn: "60m",
        };
        // create the token

        const token = jwt.sign(payload, process.env.SECRET, option);
        res.status(200).json({
          success: true,
          message: "Valid login ",
          token: token,
          userId: payload.userId,
          role: payload.role,
        });
      } catch (err) {
        console.log(err.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
 
//! exporte the api to the route wanted
module.exports={
    register,
    login
}