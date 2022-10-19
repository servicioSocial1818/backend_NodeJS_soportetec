import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT Users.idUser, Users.first_name, Users.paternal_surname, Users.maternal_surname, Users.username, Roles.role_name, Users.location, Users.phoneNumber, Users.email, Users.gender FROM Users INNER JOIN Roles ON Users.rol = Roles.idRole; "
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Users WHERE idUser = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not foud" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      paternal_surname,
      maternal_surname,
      first_name,
      date_birth,
      gender,
      phoneNumber,
      email,
      username,
      password,
      rol,
      location,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Users(paternal_surname, maternal_surname, first_name, date_birth, gender, phoneNumber, email, username, password, rol, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        paternal_surname,
        maternal_surname,
        first_name,
        date_birth,
        gender,
        phoneNumber,
        email,
        username,
        password,
        rol,
        location,
      ]
    );
    // console.log(result);
    res.json({
      id: result.insertId,
      paternal_surname,
      maternal_surname,
      first_name,
      date_birth,
      gender,
      phoneNumber,
      email,
      username,
      password,
      rol,
      location,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await pool.query("UPDATE Users SET ? WHERE idUser = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  
  try {
    const [result] = await pool.query("call deleteUser(?); ", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // try {
  //   if (!user) {
  //     user = await pool.query("DELETE FROM Users WHERE idUser = ?", [
  //       req.params.id,
  //     ]);
  //     return res.sendStatus(204);
  //   }
  //   const [result] = await pool.query(
  //     "DELETE Assignments, Users FROM Assignments INNER JOIN Users ON Assignments.idUser = Users.idUser WHERE Users.idUser = ? ",
  //     [req.params.id]
  //   );
  //   if (result.affectedRows === 0) {
  //     return res.status(404).json({ message: "User not found" });
  //   }

  //   return res.sendStatus(204);
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
};
