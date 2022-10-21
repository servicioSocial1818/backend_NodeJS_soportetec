import { pool } from "../db.js";

export const getDevices = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Devices");
    res.json(result);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDevice = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Devices WHERE idDevice = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(result[0]);
    
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

export const createDevice = async (req, res) => {
  try {
    const {
      description_device,
      serie_number, //default null
      device_type, // not null
      trademark, 
      model, 
      monitor,
      perifericos,
      storage_device,
      ram,
      processor,
      graphic_card,
      color,
    } = req.body;
  
    const [result] = await pool.query(
      "INSERT INTO Devices(description_device, serie_number, device_type, trademark, model, monitor, perifericos, storage_device, ram, processor, graphic_card, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        description_device,
        serie_number,
        device_type,
        trademark,
        model,
        monitor,
        perifericos,
        storage_device,
        ram,
        processor,
        graphic_card,
        color,
      ]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      description_device,
      serie_number,
      device_type,
      trademark,
      model,
      monitor,
      perifericos,
      storage_device,
      ram,
      processor,
      graphic_card,
      color,
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

export const updateDevice = async (req, res) => {
  try {
    const result = await pool.query("UPDATE Devices SET ? WHERE idDevice = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result)
    
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const result = await pool.query(`call deleteDevice(?)`,[
      req.params.id,
    ]);
  
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Device not found" })
    }
  
    return res.sendStatus(204);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
