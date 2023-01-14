import placesRouter from './routes/placesRouter';
import tripsRouter from './routes/tripsRouter';
import weatherRouter from './routes/weather';
import packingListRouter from './routes/packingList';
import authRouter from './routes/authRouter';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import './controllers/googleAuth';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { authenticateUser, getUser } from './controllers/authController';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('Connection established!');
  })
  .catch(() => {
    console.log('Connection failed :(');
  });

const app = express();

//session and passport initialization
app.use(
  session({
    secret: 'sessionJetSetGo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || '' }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(getUser);

app.get('/', authenticateUser, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/auth', authRouter);
app.use('/api/places', placesRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/packingList', packingListRouter);
app.use('/api/weather', weatherRouter);

app.get('/signin', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/signup', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', authenticateUser, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
