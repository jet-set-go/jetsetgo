import placesRouter from "./routes/places";
import tripsRouter from "./routes/trips";
import weatherRouter from "./routes/weather";
import packingListRouter from "./routes/packingList";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import path from "path";
import "./controllers/googleAuth";
import mongoose from "mongoose";
import PackingList from "../client/components/packinglist/PackingList";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("Connection established!");
  })
  .catch(() => {
    console.log("Connection failed :(");
  });

const app = express();

//session and passport initialization
app.use(session({ secret: "sessionJetSetGo" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));

app.use("/auth", authRouter);
app.use("/api/places", placesRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/packingList", packingListRouter);
app.use("/api/weather", weatherRouter);

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
