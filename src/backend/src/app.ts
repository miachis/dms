import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import http from "http";
import { Server } from "socket.io";
import { prisma } from "../lib/prisma.js";
import express from "express";
import cors from "cors";
import router from "./api/rest/router.js";
import { login } from "./api/rest/auth/login.js";
import passport from "passport";
import passportJwt from "../config/passportJwt.js";
passportJwt(passport);
import { upload } from "./api/rest/supabase/upload.js";
import { uploads } from "../config/multer.js";

// END OF IMPORTS

/* EXPRESS SERVER AND ITS LOGIC */

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

app.post("/login", login);
app.post("/upload/:id", uploads.single("profilePicture"), upload);
app.use("/api/users", router.users);
app.use("/messages", router.messages);

// END OF EXPRESS SERVER

/* WEBSOCKET SERVER */

const server = http.createServer(app); /*HTTP SERVER*/

const io = new Server(server, {
  cors: {
    origin: "https://dms-ivory.vercel.app",
  },
});

/* WEBSOCKET LOGIC */

io.on("connection", (socket) => {
  socket.emit("id", socket.id);

  const fullMaps = new Map();

  socket.on("send_id", (id: string) => {
    fullMaps.set(id, socket.id);
  });

  socket.on("join room", async (room: string, userId: string) => {
    socket.join(room);

    let conversation = await prisma.conversations.findFirst({
      where: {
        name: room,
      },
      include: {
        participants: true,
      },
    });

    if (!conversation) {
      // Create conversation + first participant
      conversation = await prisma.conversations.create({
        data: {
          name: room,
          participants: {
            create: [
              {
                userId: Number(userId),
              },
            ],
          },
        },
        include: {
          participants: true,
        },
      });
    } else {
      // Check if user already in participants
      const alreadyParticipant = conversation.participants.find(
        (p) => p.userId === Number(userId),
      );

      if (!alreadyParticipant) {
        await prisma.participants.create({
          data: {
            userId: Number(userId),
            conversationId: conversation.id,
          },
        });
      }
    }
  });

  socket.on(
    "send message",
    async (message: string, room: string, senderId: string) => {
      const conversation = await prisma.conversations.findFirst({
        where: {
          name: room,
        },
      });

      if (!conversation) return;

      const newMessage = await prisma.messages.create({
        data: {
          message: message,
          senderId: Number(senderId),
          conversationId: conversation.id,
        },
      });
      io.to(room).emit("message sent", message, senderId);
    },
  );
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
