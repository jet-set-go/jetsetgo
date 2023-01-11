import { Request, Response, Router } from 'express';
import { getPlacesAutocomplete } from '../controllers/placesController';

const router = Router();

router.get(
  '/autocomplete',
  getPlacesAutocomplete,
  (req: Request, res: Response) => {
    return res.json(res.locals.places);
  }
);

export default router;
