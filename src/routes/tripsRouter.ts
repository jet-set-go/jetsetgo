import {
  getPlaceDetails,
  getPlacePhotos,
} from '../controllers/placesController';
import { Request, Response, Router } from 'express';
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
} from '../controllers/tripsController';
import { authenticateUser } from '../controllers/authController';

const router = Router();

// Get a complete list of trips for the current user
router.get(
  '/',
  authenticateUser,
  getAllTrips,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.trips);
  }
);

// Create a new trip
router.post(
  '/',
  authenticateUser,
  getPlaceDetails,
  getPlacePhotos,
  createTrip,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.trip);
  }
);

// Get a single trip by id
router.get('/:id', authenticateUser, getTrip, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.trip);
});

// Delete a trip by id
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
