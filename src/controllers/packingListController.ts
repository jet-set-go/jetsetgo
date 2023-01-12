const mongoose = require("mongoose");

import { Request, Response, NextFunction } from "express";

import Trip from "./tripsController";

export const getPackingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { listId } = req.params.id;
  try {
    const currentPacking = await Trip.findById(listId);
    //console.log("currentPacking", currentPacking.packingList);
    res.locals.currentPackingList = currentPacking.packingList;
    next();
  } catch (e) {
    // const result = await newPackingList.save();
    // const result = await trip.save();
    // return res.send(200);

    return next({
      log: "Error in mongoose.createItem.",
      status: 500,
      message: { e: "An error occurred when cretating packing item." },
    });
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await Trip.findById(req.params.id);
    trip.packingList.push({
      name: req.body.item,
      checked: false,
    });
    console.log("trip", trip.packingList);
    const result = await trip.save();
    res.locals.trip = result.packingList;
    next();
  } catch (e) {
    return next({
      log: "Error in mongoose.createItem.",
      status: 500,
      message: { e: "An error occurred when cretating packing item." },
    });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get current packing List
    const itemId = req.params.itemId;
    console.log("itemId", itemId);
    const deck = await Trip.packingList.findByIdAndDelete(itemId);
    console.log("deck", deck);
    res.json(deck);
    next();
  } catch (e) {
    return next({
      log: "Error in mongoose.createItem.",
      status: 500,
      message: { e: "An error occurred when cretating packing item." },
    });
  }
};
