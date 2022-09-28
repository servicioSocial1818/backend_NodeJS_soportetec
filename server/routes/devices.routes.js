import { Router } from "express";
import {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice
} from "../controllers/devices.controllers.js";

const router = Router();

router.get("/devices", getDevices);

router.get("/devices/:id", getDevice);

router.post("/devices", createDevice);

router.put("/devices/:id", updateDevice);

router.delete("/devices/:id", deleteDevice);

export default router;
