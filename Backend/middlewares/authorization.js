const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role_id;
    const data = [role_id, string];
    const query = `SELECT role FROM roles WHERE id =$1 `;

    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized", err: err });
      });
  };
};
module.exports = authorization;
