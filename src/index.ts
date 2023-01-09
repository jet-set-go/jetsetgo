import express, { Request, Response} from 'express';
import passport from 'passport';
import path from 'path';
import '../server/controllers/googleAuth';
import { createTrip, getTrip }  from '../database/mongoose'


const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, '../../public')));

//Login path
app.get('/login/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get ('/protected', (req: Request, res: Response) => {
  res.send('Hello, you are logged in!')
})

app.get('/get-trip', getTrip)

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.post('/create-trip', createTrip)



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

