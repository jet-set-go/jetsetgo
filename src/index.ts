import express, { Request, Response } from 'express';
import path from 'path';
import placesRouter from './routes/places';
import tripsRouter from './routes/trips';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('Connection established!');
  })
  .catch((error: any) => {
    console.log('Connection failed :(', error);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api/places', placesRouter);
app.use('/api/trips', tripsRouter);

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
