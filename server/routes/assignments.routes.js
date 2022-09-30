import { Router } from "express";

import {
    getAssignment,
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from '../controllers/assignments.controllers.js'

const route = Router();

route.get('/assignments', getAssignments);

route.get('/assignments/:id', getAssignment);

route.post('/assignments', createAssignment);

route.put('/assignments/:id', updateAssignment);

route.delete('/assignments', deleteAssignment);

export default route;