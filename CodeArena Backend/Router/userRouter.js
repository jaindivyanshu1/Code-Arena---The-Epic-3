const router = require("express").Router();
const conn = require("../config/db.config");

sqlqueryhandler = (sql) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

router.get("/", async (req, res) => {
  try {
    const sql = `select * from user`;

    const data = await sqlqueryhandler(sql);

    return data
      ? res.status(200).json({ message: data })
      : res.status(500).json({ error: "something went wrong" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

module.exports = router;
