import { Router } from "express";
import {
  GetUser,
  PostUser,
  UpdateUser,
  DeleteUser,
} from "./controllers/user.js";
const router = Router();

router.get("/", GetUser);
router.post("/", PostUser);
router.patch("/", UpdateUser);
router.delete("/", DeleteUser);
