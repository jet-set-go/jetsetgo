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

    const user = req.user;
    if (!user) throw new Error('Must be logged in to create trips.');

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
        images: placeData.photos.slice(0, 3),
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
    const user = req.user;
    const trip = await Trip.findById(id);
    if (trip === null) throw new Error('Trip not found.');
    // if (trip.user.toString() !== user._id.toString())
    //   throw new Error('Trip belongs to another user.');

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
    const user = req.user;
    const trip = res.locals.trip;
    if (trip === null) throw new Error('Trip not found.');
    // if (trip.user.toString() !== user._id.toString())
    //   throw new Error('Trip belongs to another user.');
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
    const user = req.user;

    const trips = await Trip.find().exec();
    res.locals.trips = trips;

    return next();
  } catch (error) {
    return next(error);
  }
};
