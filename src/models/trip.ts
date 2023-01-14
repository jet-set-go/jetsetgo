import mongoose from "mongoose";

export interface ITrip {
  name: string;
  destination: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    place_id: string;
    images: string[];
  };
  packingList: {
    name: string;
    checked: boolean;
  }[];
  startDate: Date;
  endDate: Date;
  login: {
    userId: string;
    email: string;
  };
}

export const tripSchema = new mongoose.Schema<ITrip>(
  {
    name: { type: String, required: true },
    destination: {
      name: { type: String, required: true },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      place_id: { type: String, required: true },
      images: { type: String },
    },
    packingList: [
      {
        name: { type: String, required: true },
        checked: { type: Boolean, required: true },
      },
    ],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    login: {
      userId: { type: String },
      email: { type: String },
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export const testSchema = new mongoose.Schema({
  name: { type: String },
  number: { type: Number },
});

const Trip =
  (mongoose.models.Trip as mongoose.Model<ITrip>) ||
  mongoose.model("Trip", tripSchema);

export default Trip;
