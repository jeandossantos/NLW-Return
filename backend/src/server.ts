import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log('Back-end is running on port 3001...'));