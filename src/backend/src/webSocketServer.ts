// Websocket Server
import { Server } from "socket.io";
import { prisma } from "../lib/prisma.js";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const fullMaps = new Map();

io.on("connection", (socket) => {
  socket.emit("id", socket.id);

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
