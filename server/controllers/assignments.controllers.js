import { pool } from "../db.js";

export const getAssignments = (req, res) => {

    try {
        const result = pool.query("SELECT * FROM Assignments");
        res.json(result);
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAssignment = (req, res) => {

    
}

export const createAssignment = (req, res) => {

}

export const updateAssignment = (req, res) => {

}

export const deleteAssignment = (req, res) => {

}