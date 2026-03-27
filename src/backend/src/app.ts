import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express, { type Request, type Response } from "express";
import cors from "cors";
import router from "./api/rest/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", router.users);

// app.post("login", (req: Request, res: Response) => {});

app.listen(3000, () => {
  console.log("listening on port 3000, please change this port or use an env");
});
