import mongoose from 'mongoose';

export interface ITrip {
  name: string;
  destination: {
    name: string;
    place_id: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  packingList: {
    name: string;
    checked: boolean;
  }[];
  startDate: Date;
  endDate: Date;
}

const tripSchema = new mongoose.Schema<ITrip>({
  name: { type: String, required: true },
  destination: {
    name: { type: String, required: true },
    place_id: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  packingList: [
    {
      name: { type: String, required: true },
      checked: { type: Boolean, required: true },
    },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Trip =
  (mongoose.models.Trip as mongoose.Model<ITrip>) ||
  mongoose.model('Trip', tripSchema);

export default Trip;
