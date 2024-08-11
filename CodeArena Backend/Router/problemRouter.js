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

// router.post("/", async (req, res) => {
//   const {
//     problemCode,
//     problemName,
//     difficulty,
//     description,
//     java_code,
//     input_file,
//     java_code_runner,
//     template_code,
//     categoryId,
//   } = req.body;

//   try {
//     const sql = `Insert Into problems values (NULL,${problemCode},${problemName},${difficulty},${description},${java_code},${input_file},${java_code_runner},${template_code},${categoryId})`;

//     console.log(sql);

//     const data = await sqlqueryhandler(sql);

//     return data
//       ? res.status(200).json({ message: "problem added sucessfully" })
//       : res.status(500).json({ error: "something went wrong" });
//   } catch (e) {
//     return res.status(400).json({ error: e.sqlMessage });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const sql = `select * from problems`;

//     const data = await sqlqueryhandler(sql);

//     return data
//       ? res.status(200).json({ message: data })
//       : res.status(500).json({ error: "something went wrong" });
//   } catch (e) {
//     return res.status(400).json({ error: e.sqlMessage });
//   }
// });

// router.get("/:name", async (req, res) => {
//   try {
//     const sql = `select problemCode,problemName,difficulty,description,template_code from problems where problemName = "${req.params.name}"`;

//     const data = await sqlqueryhandler(sql);

//     return data
//       ? res.status(200).json({ message: data[0] })
//       : res.status(500).json({ error: "something went wrong" });
//   } catch (e) {
//     return res.status(400).json({ error: e.sqlMessage });
//   }
// });

// router.get("/category/:categoryId", async (req, res) => {
//   try {
//     const sql = `select problemCode,problemName,difficulty from problems where categoryId = "${req.params.categoryId}"`;

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

router.post("/", async (req, res) => {
  const {
    problemCode,
    problemName,
    difficulty,
    description,
    java_code,
    input_file,
    java_code_runner,
    template_code,
    categoryId,
  } = req.body;

  try {
    const sql = `INSERT INTO problems (problemCode, problemName, difficulty, description, java_code, input_file, java_code_runner, template_code, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const data = await sqlqueryhandler(sql, [
      problemCode,
      problemName,
      difficulty,
      description,
      java_code,
      input_file,
      java_code_runner,
      template_code,
      categoryId,
    ]);

    return data
      ? res.status(200).json({ message: "Problem added successfully" })
      : res.status(500).json({ error: "Something went wrong" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

router.get("/", async (req, res) => {
  try {
    const sql = `SELECT * FROM problems`;
    const data = await sqlqueryhandler(sql, []);
    return data
      ? res.status(200).json({ message: data })
      : res.status(500).json({ error: "Something went wrong" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const sql = `SELECT problemCode, problemName, difficulty, description, template_code FROM problems WHERE problemName = ?`;
    const data = await sqlqueryhandler(sql, [req.params.name]);
    return data
      ? res.status(200).json({ message: data[0] })
      : res.status(500).json({ error: "Something went wrong" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const sql = `SELECT problemCode, problemName, difficulty FROM problems WHERE categoryId = ?`;
    const data = await sqlqueryhandler(sql, [req.params.categoryId]);
    return data
      ? res.status(200).json({ message: data })
      : res.status(500).json({ error: "Something went wrong" });
  } catch (e) {
    return res.status(400).json({ error: e.sqlMessage });
  }
});

module.exports = router;
