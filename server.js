const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// GET semua data
app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM guests ORDER BY id DESC", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// POST tambah data
app.post("/api/guests", (req, res) => {
  const { name, message } = req.body;

  const sql = "INSERT INTO guests (name, message) VALUES (?, ?)";
  db.query(sql, [name, message], (err, result) => {
    if (err) throw err;
    res.json({ message: "Berhasil disimpan" });
  });
});

// DELETE hapus data
app.delete("/api/guests/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM guests WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Berhasil dihapus" });
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});