import { Router, Response, Request, NextFunction } from 'express'
import weatherController from '../controllers/weatherController'
const router = Router()
router.get('/', weatherController, (req:Request, res:Response) => {
  res.status(200).json(res.locals.data)
})
export default router
