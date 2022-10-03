import express  from "express";
import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/users.routes.js'
import deviceRoutes from './routes/devices.routes.js'
import assignmentRoutes from './routes/assignments.routes.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(assignmentRoutes);
app.use(indexRoutes);
app.use(userRoutes);
app.use(deviceRoutes);
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)