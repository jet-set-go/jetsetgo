import { Request, Response, Router } from 'express';
import passport from 'passport';
import {
  authenticateUser,
  loginWithEmailAndPw,
  registerWithEmailAndPw,
} from '../controllers/authController';

const router = Router();

// Google Auth Routes

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

router.get('/google/failure', (req: Request, res: Response) => {
  res.send('Failure');
});


// Manual Auth Routes

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
  
  // Other Routes
  
  router.get('/user', authenticateUser, (req: Request, res: Response) => {
    return res.status(200).json(req.user);
  });
  
  router.get('/signout', (req: Request, res: Response) => {
    req.logout((err: any) => {
      return res.status(500).send(err);
    });
    res.status(200).send();
  });
  
export default router;
