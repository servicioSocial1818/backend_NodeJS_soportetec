import { Router } from "express";

import {
    getAssignment,
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignmentsWithoutUser
} from '../controllers/assignments.controllers.js'

const route = Router();

route.get('/assignments', getAssignments);

route.get('/assignments/:id', getAssignment);

route.get('/assignments-no-users', getAssignmentsWithoutUser);

route.post('/assignments', createAssignment);

route.put('/assignments/:id', updateAssignment);

route.delete('/assignments/:id', deleteAssignment);

export default route;