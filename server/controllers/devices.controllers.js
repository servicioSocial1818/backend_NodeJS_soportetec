import { pool } from "../db.js";

export const getDevices = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM Devices");
  res.json(result);
};

export const getDevice = (req, res) => {
  const [result] = pool.query("SELECT * FROM Devices WHERE idDevice = ?", [
    req.params.id,
  ]);
  if (result.length === 0) {
    return res.status(404).json({ message: "Device not found" });
  }
  res.json(result[0]);
};

export const createDevice = async (req, res) => {
  const {
    description_device, //not null
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
};

export const updateDevice = (req, res) => {};

export const deleteDevice = (req, res) => {};
