import { NextFunction, Request, Response } from 'express';
import {
  Client,
  PlaceAutocompleteType,
  PlacePhoto,
} from '@googlemaps/google-maps-services-js';

const client = new Client({});

/**
 * Returns of list of the ten most likely destinations based on the current input string. Expects an input parameter in the request query, which is the current input string. The list of autocomplete predictions will be attached to the response object as res.locals.places.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getPlacesAutocomplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.query.input as string;
    if (!input) throw new Error('Must provide input in request query.');
    const { data } = await client.placeAutocomplete({
      params: {
        input,
        types: PlaceAutocompleteType.regions,
        key: process.env.GOOGLE_MAPS_API_KEY || '',
      },
      timeout: 1000, // milliseconds
    });

    const matches = data.predictions.map((prediction) => {
      return {
        name: prediction.description,
        place_id: prediction.place_id,
      };
    });

    res.locals.places = matches;
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

/**
 * A middleware function that fetches place information from the Google Places API. Expects a place_id parameter in the request body. The place information will be attached to the response object as res.locals.place.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getPlaceDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { place_id } = req.body;
    if (!place_id) throw new Error('Must provide place_id in request body.');

    const { data } = await client.placeDetails({
      params: {
        place_id,
        key: process.env.GOOGLE_MAPS_API_KEY || '',
      },
    });

    res.locals.place = data.result;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const getPlacePhotos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const placeDetails = res.locals.place;
    if (!placeDetails)
      throw new Error(
        'Middleware function getPlacePhotos must be invoked after getPlaceDetails.'
      );

    const photos = [];

    for (let i = 0; i < 3; i++) {
      const photo = placeDetails.photos[i];
      if (!photo) break;
      const response = await client.placePhoto({
        params: {
          photoreference: photo.photo_reference,
          maxwidth: 400,
          key: process.env.GOOGLE_MAPS_API_KEY || '',
        },
        responseType: 'arraybuffer',
      });

      // Extracts the URL from the repsonse, ignoring the actual image data
      const url = response.request._redirectable._options.href as string;
      photos.push(url);
    }

    res.locals.photos = photos;

    return next();
  } catch (error) {
    return next(error);
  }
};
