import { BookOnline } from "@mui/icons-material";

const mongoose = require("mongoose");

export interface ITrip {
  name: string;
  destination: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    place_id: string;
  };
  packingList: {
    name: string;
    checked: boolean;
  }[];
  startDate: Date;
  endDate: Date;
}

export const tripSchema = new mongoose.Schema<ITrip>({
  name: { type: String, required: true },
  destination: {
    name: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    place_id: { type: String, required: true },
  },
  packingList: [
    {
      name: { type: String, required: true },
      checked: { type: Boolean, required: true },
    },
  ],
  // startDate: { type: Date, required: true },
  // endDate: { type: Date, required: true },
});

//format for items
export const makeNewItem = (task: string) => {
  return {
    item: task,
    packed: false,
  };
};

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
