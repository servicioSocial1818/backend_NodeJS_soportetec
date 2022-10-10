import { pool } from "../db.js";

export const getAssignments = async (req, res) => {

    try {
        const [result] = await pool.query("SELECT Assignments.idAssignment, Users.first_name, Users.paternal_surname, Users.maternal_surname, Devices.trademark, Assignments.manager, Devices.serie_number FROM ((Assignments LEFT JOIN Users ON Assignments.idUser = Users.idUser) LEFT JOIN Devices ON Assignments.idDevice = Devices.idDevice)");
        res.json(result);
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getAssignment = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM Assignments WHERE idAssignment = ?",[
            req.params.id,
        ]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Assignment not found" })
        }
        res.json(result[0]);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAssignment = async (req, res) => {
    try {
        const {
            idUser, //not null
            idDevice, //not null
            manager, //not null
        } = req.body;
    
        const [result] = await pool.query("INSERT INTO Assignments(idUser, idDevice, manager) VALUES (?, ?, ?)",[
            idUser,
            idDevice,
            manager
        ]);
        
        res.json({
            id:result.insertId,
            idUser,
            idDevice,
            manager
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const result = await pool.query("UPDATE Assignments SET ? WHERE idAssignment = ?", [
            req.body,
            req.params.id,
        ]);
        res.json(result)
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAssignment = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM Assignments WHERE idAssignment = ?",[
            req.params.id,
        ]);
    
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}