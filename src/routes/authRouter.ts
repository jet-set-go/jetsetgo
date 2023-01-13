import express, { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { loginWithEmailAndPw, oauthCreateUserOrUpdateSessionIfExists } from '../controllers/authController';

const router = Router();

interface User extends Express.User{
    displayName: string;
};

//session middleware
function isLoggedIn(req: Request, res: Response, next: NextFunction){
    req.user ? next() : res.sendStatus(401);
  }
  //Login path
  router.get('/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  router.get( '/google/callback',
      passport.authenticate( 'google', {
          successRedirect: '/auth/protected',
          failureRedirect: '/auth/google/failure'
  }));
  
  router.get ('/protected', isLoggedIn, oauthCreateUserOrUpdateSessionIfExists, (req: Request, res: Response) => {
    
    res.send(`Hello, you - ${res.locals.username} - are logged in!`)
  })
  
  router.get ('/google/failure', (req: Request, res: Response) => {
    res.send('Failure');
  })

  router.get('/signout', (req: Request, res: Response) => {
    req.logout((err: any) => {});
    req.session.destroy((err: any) => {});
    res.send('Goodbye!')
  })

//manual login routes

  router.post('/login', loginWithEmailAndPw, (req: Request, res: Response) => {
    res.send(200).json(res.locals.user);
  })

export default router;