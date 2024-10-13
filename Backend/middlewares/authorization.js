const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [role_id];
    const query = `SELECT * FROM roles WHERE id =$1`;

    pool
      .query(query, data)
      .then((result) => {
        if (result.rows[0].role ===string) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "unauthorized", err: err });
      });
  };
};
module.exports = authorization;
