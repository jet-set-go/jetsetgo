import express, { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import {
  authenticateUser,
  loginWithEmailAndPw,
  registerWithEmailAndPw,
  // oauthCreateUserOrUpdateSessionIfExists,
} from '../controllers/authController';

const router = Router();

// interface User extends Express.User {
//   displayName: string;
// }

//session middleware
// function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//   req.user ? next() : res.sendStatus(401);
// }
//Login path
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
);

// router.get(
//   '/protected',
//   isLoggedIn,
//   oauthCreateUserOrUpdateSessionIfExists,
//   (req: Request, res: Response) => {
//     res.send(`Hello, you - ${res.locals.username} - are logged in!`);
//   }
// );

router.get('/google/failure', (req: Request, res: Response) => {
  res.send('Failure');
});

router.get('/signout', (req: Request, res: Response) => {
  req.logout((err: any) => {
    return res.status(500).send(err);
  });
  res.status(200).send();
});

//manual login routes

router.post(
  '/register',
  registerWithEmailAndPw,
  loginWithEmailAndPw,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

router.post('/login', loginWithEmailAndPw, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
});

router.get('/user', authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json(req.user);
});

export default router;
