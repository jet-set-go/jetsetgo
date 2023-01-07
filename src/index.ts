import express, { Request, Response } from 'express';
import path from 'path';
import placesRouter from './routes/places';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api/places', placesRouter);

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
