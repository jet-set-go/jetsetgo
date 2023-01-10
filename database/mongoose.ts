const mongoose = require("mongoose");

import { Request, Response, NextFunction } from "express";
import { Schema, model, connect } from "mongoose";
import { makeNewItem } from "../models/trip";

import Trip from "../models/trip";

mongoose
  .connect(
    "mongodb+srv://jmarchant:XyIWQYpZuJwGkKbN@default.xb0hjgi.mongodb.net/goblinShark?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection established!");
  })
  .catch(() => {
    console.log("Connection failed :(");
  });

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createdTrip = new Trip({
    name: req.body.name,
    destination: req.body.destination,
  });
  const result = await createdTrip.save();

  res.json(result);
};

export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trip = await Trip.find().exec();
  res.json(trip);
};

//works
export const getPackingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentPacking = await Trip.findById(req.params.id);
    console.log("currentPacking", currentPacking.packingList);
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
  // const { id, item } = req.body;
  // console.log("NewItem:", newItem);
  console.log("req.body", req.body);
  console.log("req.body.item", req.body.item);
  console.log("req.params.id", req.params.id);

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
    const currentPacking = await Trip.findById(req.params.id);
    console.log("currentPacking", currentPacking.packingList);

    const ditem = await currentPacking.packingList.filter(
      (item: Object) => item.name == req.body.name
    );
    const result = await ditem.save();
    console.log("result", result);
    res.locals.stillPack = result.packingList;
  } catch (e) {
    return next({
      log: "Error in mongoose.createItem.",
      status: 500,
      message: { e: "An error occurred when cretating packing item." },
    });
  }
};

// packingList: {
//   items: [{ item: String }],
// },
