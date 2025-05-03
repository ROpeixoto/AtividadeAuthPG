import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js'; // <-- Adicione esta linha
import userRoute from './routes/user.route.js';
import exampleRoute from './routes/example.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/secureExampleRoute", exampleRoute);
app.get('/', (req,res)=> {
    res.send({message: 'Hello World!'});
}); 

// Criação automática da tabela users se não existir
const createUsersTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `);
};
createUsersTable();

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`server is running on port http://localhost:${PORT}`)
});