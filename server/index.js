const express = require("express");
const { connectDB } = require('./src/utils/db')
const router = require('./src/api/routes/workout.routes')
const server = express();
const routerUser = require('./src/api/routes/user.routes')

const cors = require('cors');

server.use(cors());  // Permitir CORS para todas las solicitudes
server.use(express.json());

const env = require('dotenv');
env.config()
const PORT = 5000;
connectDB()

server.use(express.json())
server.use('/', router)
server.use('/user', routerUser)

server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT} `)
})
// Inicia el servidor

