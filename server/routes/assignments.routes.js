import { Router } from "express";

import {
    getAssignment,
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    //getAssignmentsWithoutUser,
    getAssignmentsWithoutDevice
} from '../controllers/assignments.controllers.js'

const route = Router();

route.get('/api/assignments', getAssignments);

route.get('/api/assignments/:id', getAssignment);

//route.get('/assignments-no-users', getAssignmentsWithoutUser);

route.get('/api/assignments-no-devices', getAssignmentsWithoutDevice);

route.post('/api/assignments', createAssignment);

route.put('/api/assignments/:id', updateAssignment);

route.delete('/api/assignments/:id', deleteAssignment);

export default route;