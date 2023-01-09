const mongoose = require('mongoose')

import { Request, Response, NextFunction } from 'express'
import { Schema, model, connect } from 'mongoose'

import Trip from '../models/trip'

mongoose.connect('mongodb+srv://jmarchant:XyIWQYpZuJwGkKbN@default.xb0hjgi.mongodb.net/goblinShark?retryWrites=true&w=majority').then(() => {
    console.log('Connection established!')
}).catch(() => {
    console.log('Connection failed :(')
})

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