import { Request, Response, Router } from "express";

import {
  createItem,
  deleteItem,
  getPackingList,
  checkOff,
} from "../controllers/packingListController";
import { getTrip } from "../controllers/tripsController";

const router = Router();

//get individual packing list that is in the specific trip data
router.get("/:id", getTrip, getPackingList, (req, res) =>
  res.status(200).json(res.locals.currentPackingList)
);

//add to packing list
router.post("/:id", getTrip, createItem, (req, res) =>
  res.status(200).json(res.locals.packingList)
);

router.patch("/:id/:itemId", getTrip, checkOff, (req, res) =>
  res.status(200).json(res.locals.packingList)
);

router.delete("/:id/:itemId", getTrip, deleteItem, (req, res) =>
  res.status(200).json({ message: "item removed" })
);

export default router;
