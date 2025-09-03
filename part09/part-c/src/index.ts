import express from 'express';
import cors from 'cors';
import pongRouter from './routes/pong';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/ping', pongRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
