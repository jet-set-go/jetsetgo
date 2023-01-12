const mongoose = require("mongoose");

import { ConstructionOutlined } from "@mui/icons-material";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { TItem } from "../../client/components/packinglist/api/getItems";
import Trip, { ITrip } from "../models/trip";

export const getPackingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get the specific id of the trip
  console.log("res.params", req.params);
  try {
    const trip = res.locals.trip;
    res.locals.currentPackingList = trip.packingList;
    next();
  } catch (e) {
    return next(e);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item: TItem = {
      name: req.body.item,
      checked: false,
    };
    const trip = res.locals.trip;
    trip.packingList.push(item);
    console.log("trip", trip);
    const result = await trip.save();
    res.locals.packingList = result.packingList;
    next();
  } catch (e) {
    return next(e);
  }
};

export const checkOff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;
  try {
    const trip = res.locals.trip;
    trip._id;
    const packingList = trip.packingList;
    const itemIdx = packingList.findIndex(
      (item: TItem & { _id: ObjectId }) => item._id.toString() === itemId
    );
    packingList[itemIdx].checked = true;
    trip.save();
    res.locals.packingList = trip.packingList;
    next();
  } catch (e) {
    return next(e);
  }
};

// export const deleteItem = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { itemId } = req.params;

//   try {
//     //get current packing List
//     const trip = res.locals.trip;
//     const deck = await trip.findByIdAndDelete(itemId);
//     console.log("deck", deck);
//     res.json(deck);
//     next();
//   } catch (e) {
//     return next(e);
//   }
// };
