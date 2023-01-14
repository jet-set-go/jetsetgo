import { Email } from '@mui/icons-material';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';

export const loginWithEmailAndPw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body; // Abc123
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const userAuthenticated = await bcrypt.compare(password, user.password);
    if (!userAuthenticated) {
      throw new Error('Invalid email or password');
    }

    req.session.userId = user.id;
    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const registerWithEmailAndPw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // TODO: Validate email and password

    const hashedPassword = await bcrypt.hash(password, 10); //Abc123 -> 83hrg9824hg2h34f89132h4f9h

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return next();
    }
    const user = await User.findById(userId);
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    console.log('Authenticated user: ', req.user);
    return next();
  }
  res.status(401).redirect('/signin');
};
