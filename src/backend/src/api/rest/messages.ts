import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../../../lib/prisma.js";
const router = Router();

// expects an id that will be used to find messages containing that id as the conversationId, not the message id itself

router.get(
  "/:conversationName",
  async (req: Request<{ conversationName: string }>, res: Response) => {
    try {
      const messages = await prisma.conversations.findMany({
        where: {
          name: req.params.conversationName,
        },
        include: {
          messages: true,
        },
      });
      return res.status(200).json({ success: true, response: messages });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return;
    }
  },
);

export default router;
