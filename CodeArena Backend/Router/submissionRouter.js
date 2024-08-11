// const router = require("express").Router();
// const conn = require("../config/db.config");

// sqlqueryhandler = (sql) => {
//   return new Promise((resolve, reject) => {
//     conn.query(sql, (error, elements) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(elements);
//     });
//   });
// };

// const addsubmisson = async (userId, problemId, code, status, verdict) => {
//   try {
//     const sql = `insert Into submission where`;

//     const data = await sqlqueryhandler(sql);

//     return data
//       ? res.status(200).json({ message: data })
//       : res.status(500).json({ error: "something went wrong" });
//   } catch (e) {
//     return res.status(400).json({ error: e.sqlMessage });
//   }
// };

// router.post("/", async (req, res) => {
//   const { userId, problemId } = req.body;

//   try {
//     const sql = `select * from submission where userId=${userIdInt} and problemID=${problemIdInt}`;

//     const data = await sqlqueryhandler(sql);

//     return data
//       ? res.status(200).json({ message: data })
//       : res.status(500).json({ error: "something went wrong" });
//   } catch (e) {
//     return res.status(400).json({ error: e.sqlMessage });
//   }
// });

// module.exports = router;


const router = require("express").Router();
const conn = require("../config/db.config");

const sqlqueryhandler = (sql, params) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const addSubmission = async (userId, problemId, code, status, verdict, res) => {
  try {
    const sql = `INSERT INTO submission (userId, problemId, code, status, verdict) VALUES (?, ?, ?, ?, ?)`;
    const params = [userId, problemId, code, status, verdict];

    const data = await sqlqueryhandler(sql, params);

    return data.affectedRows > 0
      ? res.status(200).json({ message: "Submission added successfully" })
      : res.status(500).json({ error: "Failed to add submission" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
};

router.post("/", async (req, res) => {
  const { userId, problemId, code, status, verdict } = req.body;

  try {
    const sql = `SELECT * FROM submission WHERE userId = ? AND problemId = ?`;
    const params = [userId, problemId];

    const data = await sqlqueryhandler(sql, params);

    return data.length > 0
      ? res.status(200).json({ message: data })
      : res.status(404).json({ error: "No submissions found for the given userId and problemId" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

module.exports = router;
