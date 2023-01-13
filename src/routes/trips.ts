import { getPlaceDetails } from './../controllers/placesController';
import { Request, Response, Router } from 'express';
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
} from '../controllers/tripsController';
import { getUserBySession } from '../controllers/authController';

const router = Router();

router.get('/', getUserBySession, getAllTrips, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trips);
});

router.post('/', getUserBySession, getPlaceDetails, createTrip, (req: Request, res: Response) => {
  console.log('Created trip: ', res.locals.trip);
  return res.status(201).json(res.locals.trip);
});

router.get('/:id', getUserBySession, getTrip, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trip);
});

router.delete('/:id', getUserBySession, getTrip, deleteTrip, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trip);
});

export default router;
