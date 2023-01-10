const mongoose = require('mongoose')

interface ITrip {
    name: string,
    destination: string
}

export const tripSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    destination: {type: String, required: true}
})

const Trip = mongoose.model('Trip', tripSchema)

export default Trip