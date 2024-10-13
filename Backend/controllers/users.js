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
    .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        
        });
      });
};
