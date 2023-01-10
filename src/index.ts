import express, { Request, Response } from "express";
import path from "path";
import {
  createTrip,
  getTrip,
  getPackingList,
  createItem,
  deleteItem
} from "../database/mongoose";

import bodyParser from "body-parser";

const app = express();

app.use(express.json());
=

app.use(express.static(path.join(__dirname, "../../public")));

app.get("/get-trip", getTrip);
app.post("/create-trip", createTrip);



//get current packing list
app.get("/:id/tripdetails/packingList", getPackingList, (req,res)=> 
res.status(200).json(res.locals.currentPackingList));

//add to packing list
app.post("/:id/tripdetails/packingList", createItem,
(req,res)=> res.status(200).json(res.locals.trip));

app.delete("/:id/tripdetails/packingList/:linkId", deleteItem, (req, res)=>
res.status(200).json(res.locals.stillPack))



// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
