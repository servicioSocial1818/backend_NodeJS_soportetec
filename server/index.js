import express  from "express";
import {PORT} from './config.js'
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/users.routes.js'


const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(userRoutes);
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)