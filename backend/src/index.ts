import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as users from "./routes/UserController";
import * as cron from "node-cron";
const app = express();
const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const staticfile = path.resolve(__dirname, "../../mocks", "users.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//For now i have put it in App level... but can be changed to mini Routers
app.use("/login", users.authcall);
app.use("/users", users.getUsers);
app.use("/register", users.registerUsers);

//TODO to move to a better
//This will update our json on sunday 00:00
cron
  .schedule("0 0 * * 0", async () => {
    let usersjson = await fsPromises.readFile(staticfile, "utf8");
    let parseuserjson = JSON.parse(usersjson);
    let outUsers = parseuserjson.users.map((user: any) => {
      user.numberOfKudosRemaining = 3;
      user.kudosReceivedFrom = [];
      user.kudosGivenTo = [];
      return user;
    });
    parseuserjson.users = outUsers;
    await fsPromises.writeFile(staticfile, JSON.stringify(parseuserjson));
  })
  .start();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
