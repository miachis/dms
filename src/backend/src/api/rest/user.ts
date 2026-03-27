import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";
import { validationResult } from "express-validator";
import { validation } from "../../validators/formValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

interface UserInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type UserId = {
  userId: string;
};

async function PostUser(req: Request<{}, {}, UserInputs>, res: Response) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { email, username, password, confirmPassword } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingEmail = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      const existingUsername = await prisma.users.findUnique({
        where: {
          username,
        },
      });

      if (existingEmail)
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });

      if (existingUsername)
        return res
          .status(400)
          .json({ success: false, error: "Username already exists" });

      const user = await prisma.users.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      // Sign the user a json web token but using only user id to avoid account hacking
      const accessToken = jwt.sign(
        {
          payload: user.id,
        },
        `${process.env.ACCESS_TOKEN_KEY}`,
      );

      return res.status(200).json({ success: true, token: accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, response: `An error occured: ${error}` });
    }
  } else {
    res.status(400).json({ success: false, error: result.array() });
  }
}

async function GetUser(req: Request<UserId, {}, {}>, res: Response) {
  // try {
  //   const userId = +req.params.userId;
  //   const user = await prisma.users.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //     select: {
  //       username: true,
  //       email: true,
  //     },
  //   });
  //   return res.status(200).json({ success: true, response: user });
  // } catch (error) {
  //   res.status(404).json({ success: false, error: "Resource Not Found." });
  // }
  console.log("gotten");
}

async function UpdateUser(req: Request, res: Response) {
  console.log("updated");
}

async function DeleteUser(req: Request, res: Response) {
  console.log("deleted");
}

router.get("/:userId", GetUser);
router.post("/", validation, PostUser);
router.patch("/", UpdateUser);
router.delete("/", DeleteUser);

export default router;
