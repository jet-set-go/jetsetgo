import { Request, Response, Router } from 'express';
import placesController from '../controllers/placesController';

const router = Router();

router.get(
  '/autocomplete',
  placesController.getPlacesAutocomplete,
  (req: Request, res: Response) => {
    return res.json(res.locals.places);
  }
);

export default router;
