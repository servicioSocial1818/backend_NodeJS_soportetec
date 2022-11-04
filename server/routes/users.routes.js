import { Router } from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controllers.js"

const router = Router();

router.get("/api/users", getUsers);

router.get("/api/users/:id", getUser);

router.post("/api/users", createUser);

router.put("/api/users/:id", updateUser);

router.delete("/api/users/:id", deleteUser);

export default router;

