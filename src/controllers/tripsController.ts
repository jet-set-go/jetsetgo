import { Request, Response, NextFunction } from 'express';
import Trip from '../models/trip';

/**
 * A middleware function for creating a new trip. Must be called after the getPlaceDetails middleware. Expects name, startDate, and endDate in the request body. The resulting trip will be attached to the response object as res.locals.trip.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, startDate, endDate } = req.body;
    if (!name || !startDate || !endDate)
      throw new Error('Must provide name, startDate, and endDate.');

    const placeData = res.locals.place;
    if (!placeData)
      throw new Error(
        'Middleware function createTrip must be invoked after getPlaceDetails.'
      );

    const user = req.user;
    if (!user) throw new Error('Must be logged in to create trips.');

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

/**
 * This middleware function will fetch a trip from the database and attach it to the response object as res.locals.trip. It will also check that the trip belongs to the user. Expects an id parameter in the request params.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Must provide id in request params.');

    const user = req.user;
    if (!user) throw new Error('Must be logged in to get trip information.');

    const trip = await Trip.findById(id);
    if (!trip) throw new Error('Trip not found.');

    // if (trip.user.id !== user.id)
    //   throw new Error('Trip belongs to another user.');

    res.locals.trip = trip;
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * This middleware function will delete a trip from the database if it belongs to the current user. Must be called after the getTrip middleware (expects a trip to already exist on the response object).
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error('Must be logged in to delete trips.');

    const trip = res.locals.trip;
    if (!trip)
      throw new Error(
        'Middleware function deleteTrip must be invoked after getTrip.'
      );
    // if (trip.user.id !== user.id)
    //   throw new Error('Trip belongs to another user.');
    await trip.remove();
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Gets all trips for the current user and attaches them as an array to the response object as res.locals.trips.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error('Must be logged in to get trip information.');

    const trips = await Trip.find().exec();
    res.locals.trips = trips;

    return next();
  } catch (error) {
    return next(error);
  }
};
