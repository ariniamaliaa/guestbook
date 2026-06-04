const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "guestbook-bay-tau.vercel.app",
  user: "root",
  password: "", // default XAMPP kosong
  database: "guestbook"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = db;