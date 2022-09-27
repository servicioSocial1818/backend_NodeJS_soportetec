import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM Users");
  res.json(result);
};

export const getUser = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM Users WHERE idUser = ?", [
    req.params.id,
  ]);
  if (result.length === 0) {
    return res.status(404).json({ message: "Task not foud" });
  }
  res.json(result[0]);
};

export const createUser = async (req, res) => {
  const {
    paternal_surname,
    maternal_surname,
    first_name,
    gender,
    username,
    password,
    rol,
    location,
  } = req.body;
  const [result] = await pool.query(
    "INTERT INTO Users(paternal_surname, maternal_surname, first_name, gender, username, password, rol, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      paternal_surname,
      maternal_surname,
      first_name,
      gender,
      username,
      password,
      rol,
      location,
    ]
  );
  console.log(result);
  res.json({
    id: result.insertId,
    paternal_surname,
    maternal_surname,
    first_name,
    gender,
    username,
    password,
    rol,
    location,
  });
};

export const updateUser = async (req, res) => {
    const result = await pool.query("UPDATE Users SET ? WHERE idUser = ?", [
        req.body,
        req.params.id,
    ]);
    res.json(result);
};

export const deleteUser = async (req, res) => {
    const [result] = await pool.query("DELETE FROM Users WHERE id = ?", [
        req.params.id,
    ]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
    }

    return res.sendStatus(204);
};
