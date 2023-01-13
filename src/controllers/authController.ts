import { Email } from '@mui/icons-material';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const loginWithEmailAndPw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  User.findOne({ email, password }, (err: any, user: object) => {
    res.locals.user = user;
    return next(err);
  });
};

// export const oauthCreateUserOrUpdateSessionIfExists = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // const user: User = req.user! as User;
//   //@ts-ignore
//   const { email, id, given_name, family_name, photos, displayName } = req.user;
//   User.findOneAndUpdate(
//     { email },
//     { session: req.session.id },
//     (err: any, user: object) => {
//       console.log('This is updated user - note session');
//       console.log(user);
//       if (err) return next(err);
//       if (!user) {
//         User.create(
//           {
//             userId: id,
//             email: email,
//             sso: true,
//             firstName: given_name,
//             lastName: family_name,
//             username: email,
//             displayName: displayName,
//             photos: photos,
//           },
//           (err: any, user: object) => {
//             console.log('This is created user');
//             console.log(user);
//             res.locals.username = email;
//             if (err) {
//               return next(err);
//             }
//             return next();
//           }
//         );
//       }
//       res.locals.username = email;
//       return next();
//     }
//   );
// };

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
