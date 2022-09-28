import express  from "express";
import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/users.routes.js'
import deviceRoutes from './routes/devices.routes.js'

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);
app.use(deviceRoutes);
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)