import { Request, Response, Router } from "express";
import { createItem } from "../../client/components/packinglist/api/createItem";
import { deleteItem } from "../../client/components/packinglist/api/deleteItem";
import { getPackingList } from "../controllers/packingListController";

const router = Router();

router.get("/:id", getPackingList, (req, res) =>
  res.status(200).json(res.locals.currentPackingList)
);

//add to packing list
router.post("/:id", createItem, (req, res) =>
  res.status(200).json(res.locals.trip)
);

router.delete("/:id/:itemId", deleteItem, (req, res) =>
  res.status(200).json({ message: "recipe removed" })
);

export default router;
