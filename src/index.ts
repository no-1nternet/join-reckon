import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { testOne, testTwo } from "./controllers";

//  Setup
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

// Route
app.get("/", testOne);
app.get("/test-two", testTwo);

// Start
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
