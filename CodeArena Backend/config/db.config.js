var mysql = require("mysql");
const env = require("dotenv");

env.config();

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Current-Root-Password",
  database: "codeEditor",
});

con.connect(function (err) {
  if (err) {
    // console.log(process.env.DATABASE_USER);
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

module.exports = con;
