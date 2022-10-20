import { Router } from "express";

import {
    getAssignment,
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignmentsWithoutUser,
    getAssignmentsWithoutDevice
} from '../controllers/assignments.controllers.js'

const route = Router();

route.get('/assignments', getAssignments);

route.get('/assignments/:id', getAssignment);

route.get('/assignments-no-users', getAssignmentsWithoutUser);

route.get('/assignments-no-devices', getAssignmentsWithoutDevice);

route.post('/assignments', createAssignment);

route.put('/assignments/:id', updateAssignment);

route.delete('/assignments', deleteAssignment);

export default route;