import mongoose from 'mongoose';

export interface ITrip {
  name: string;
  destination: string;
}

const tripSchema = new mongoose.Schema<ITrip>({
  name: { type: String, required: true },
  destination: { type: String, required: true },
});

const Trip =
  (mongoose.models.Trip as mongoose.Model<ITrip>) ||
  mongoose.model('Trip', tripSchema);

export default Trip;
