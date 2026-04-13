import type { Request, Response } from "express";
import { prisma } from "../../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserInfo {
  email: string;
  password: string;
}

export async function login(req: Request<{}, {}, UserInfo>, res: Response) {
  try {
    const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

    if (!accessTokenKey) {
      throw new Error("Access token is undefined");
    }

    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "Incorrect email or password" });

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword)
      return res
        .status(404)
        .json({ success: false, error: "Incorrect email or password" });

    const payload = {
      id: user.id,
    };
    const accessToken = jwt.sign(payload, accessTokenKey);

    return res.status(200).json({ success: true, token: accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `An error occured: ${error}` });
  }
}
