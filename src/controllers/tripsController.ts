import { Request, Response, NextFunction } from 'express';
import Trip from '../models/trip';

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const placeData = res.locals.place;

    console.log('placeData', placeData);

    const trip = {
      name,
      destination: {
        name: placeData.name,
        place_id: placeData.place_id,
        location: {
          lat: placeData.geometry.location.lat,
          lng: placeData.geometry.location.lng,
        },
      },
    };

    const createdTrip = new Trip(trip);
    const result = await createdTrip.save();

    res.locals.trip = result;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById(id);
    res.locals.trip = trip;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trips = await Trip.find().exec();
    res.locals.trips = trips;

    return next();
  } catch (error) {
    return next(error);
  }
};
