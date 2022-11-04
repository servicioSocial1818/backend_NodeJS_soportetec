import { Router } from "express";
import {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice
} from "../controllers/devices.controllers.js";

const router = Router();

router.get("/api/devices", getDevices);

router.get("/api/devices/:id", getDevice);

router.post("/api/devices", createDevice);

router.put("/api/devices/:id", updateDevice);

router.delete("/api/devices/:id", deleteDevice);

export default router;
