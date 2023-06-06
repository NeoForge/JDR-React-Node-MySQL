import express from 'express';
import cors from 'cors';
import { routeLoader } from './routes/routesLoader.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
routeLoader(app);