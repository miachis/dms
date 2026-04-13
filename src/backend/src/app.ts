import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import router from "./api/rest/router.js";
import { login } from "./api/rest/auth/login.js";
import passport from "passport";
import passportJwt from "../config/passportJwt.js";
passportJwt(passport);
import { upload } from "./api/rest/supabase/upload.js";
import { uploads } from "../config/multer.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.post("/login", login);
app.post("/upload/:id", uploads.single("profilePicture"), upload);
app.use("/api/users", router.users);
app.use("/messages", router.messages);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
