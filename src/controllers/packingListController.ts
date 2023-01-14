const mongoose = require("mongoose");

import { ConstructionOutlined } from "@mui/icons-material";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { TItem } from "../../client/components/PackingList/api/getItems";
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
    if (packingList[itemIdx].checked === true) {
      packingList[itemIdx].checked = false;
    } else {
      packingList[itemIdx].checked = true;
    }
    let checked = packingList.filter((item) => item.checked === true);
    let notchecked = packingList.filter((item) => item.checked !== true);
    let packing2 = notchecked.concat(checked);
    console.log("combo", packing2);
    trip.packingList = packing2;
    trip.save();
    res.locals.packingList = trip.packingList;
    next();
  } catch (e) {
    return next(e);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;

  try {
    //get current trip
    const trip = res.locals.trip;
    //filter the packingList of each trip
    const deletedItem = trip.packingList.filter(
      (item: TItem) => item._id.toString() == itemId
    );
    const packingList = trip.packingList.filter(
      (item: TItem) => item._id.toString() !== itemId
    );
    console.log("deletedItem", deletedItem);
    console.log("packingLIst", packingList);
    //set the packingList to the new packing list
    trip.packingList = packingList;
    //save the trip
    trip.save();
    //return the deleted itm
    res.locals.packingList = trip.packingList;

    next();
  } catch (e) {
    return next(e);
  }
};
