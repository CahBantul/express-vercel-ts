import express, { Request, Response } from 'express';
import connectDB from './utils/database';
import router from './routes/AuthRoute';

const app = express();
const PORT = 3000;

try {
  connectDB();
} catch (error) {
  console.log('error', error)
}

app.use(express.json());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World from vervel');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});