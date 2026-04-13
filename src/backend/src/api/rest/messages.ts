import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";
const router = Router();

// expects an id that will be used to find messages containing that id as the conversationId, not the message id itself

router.get("/:conversationId", async (req: Request, res: Response) => {
  try {
    const messages = await prisma.messages.findMany({
      where: {
        conversationId: Number(req.params.conversationId),
      },
    });
    return res.status(200).json({ success: true, response: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Creating a new message
type PostMessage = {
  message: string;
  senderId: string;
  conversationId: string;
};

router.post("/", async (req: Request<{}, {}, PostMessage>, res: Response) => {
  try {
    const message = await prisma.messages.create({
      data: {
        message: req.body.message,
        senderId: Number(req.body.senderId),
        conversationId: Number(req.body.conversationId),
      },
    });
    return res.status(200).json({ success: true, response: message });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
