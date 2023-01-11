const mongoose = require('mongoose')

import { Request, Response, NextFunction } from 'express'
import { Schema, model, connect } from 'mongoose'

import Trip from '../models/tripController'

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
    const createdTrip = new Trip({
        name: req.body.name,
        destination: req.body.destination
    })
    const result = await createdTrip.save()

    res.json(result)
}

export const getTrip = async (req: Request, res: Response, next: NextFunction) => {
    const trip = await Trip.find().exec()
    res.json(trip)
}