import { NextFunction, Request, Response } from 'express';
import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';

const client = new Client({});

const placesController = {
  getPlacesAutocomplete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const input = req.query.input as string;

    try {
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
        }
      })

      res.locals.places = matches;
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};

export default placesController;
