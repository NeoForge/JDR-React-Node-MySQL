import express from 'express';
import cors from 'cors';
import { sequelize } from './data/sequelizeInit.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

await assertDatabaseConnectionOk();



async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}