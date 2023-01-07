import { NextFunction, Request, Response } from 'express';

const placesController = {
  getPlacesAutocomplete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('Hello from controller');
    return next();
  },
};

export default placesController;
