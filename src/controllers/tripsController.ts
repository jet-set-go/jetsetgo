import { Request, Response, NextFunction } from 'express';
import Trip from '../models/trip';

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, startDate, endDate } = req.body;
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
      startDate,
      endDate,
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
    if (trip === null) throw new Error('cannot get trip id');
    res.locals.trip = trip;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = res.locals.trip;
    await trip.remove();
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
