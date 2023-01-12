import placesRouter from './routes/places';
import tripsRouter from './routes/trips';
import weatherRouter from './routes/weather'
import packingListRouter from './routes/packingList'
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import './controllers/googleAuth';
import mongoose from 'mongoose';
import PackingList from '../client/components/packinglist/PackingList';
;

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

app.use(session({secret: 'flyyyy JetSetGo'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));


//session middleware
function isLoggedIn(req: Request, res: Response, next: NextFunction){
  req.user ? next() : res.sendStatus(401);
}
//Login path
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get ('/protected', isLoggedIn, (req: Request, res: Response) => {
  res.send('Hello, you are logged in!')
})
app.get ('/auth/google/failure', (req: Request, res: Response) => {
  res.send('Failure');
})

app.use('/api/places', placesRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/packingList', packingListRouter)
app.use('/api/weather', weatherRouter)

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

