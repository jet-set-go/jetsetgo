import { getPlaceDetails } from './../controllers/placesController';
import { Request, Response, Router } from 'express';
import {
  createTrip,
  getAllTrips,
  getTrip,
} from '../controllers/tripsController';

const router = Router();

router.get('/', getAllTrips, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trips);
});

router.post('/', getPlaceDetails, createTrip, (req: Request, res: Response) => {
  return res.status(201).json(res.locals.trip);
});

router.get('/:id', getTrip, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trip);
});

export default router;
