import { getPlaceDetails } from './../controllers/placesController';
import { Request, Response, Router } from 'express';
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
} from '../controllers/tripsController';
import { authenticateUser } from '../controllers/authController';

const router = Router();

router.get(
  '/',
  authenticateUser,
  getAllTrips,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.trips);
  }
);

router.post(
  '/',
  authenticateUser,
  getPlaceDetails,
  createTrip,
  (req: Request, res: Response) => {
    console.log('Created trip: ', res.locals.trip);
    return res.status(201).json(res.locals.trip);
  }
);

router.get('/:id', authenticateUser, getTrip, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trip);
});

router.delete(
  '/:id',
  authenticateUser,
  getTrip,
  deleteTrip,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.trip);
  }
);

export default router;
