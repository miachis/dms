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

  socket.on("join room", async (room) => {
    socket.join(room);

    // const existingConversation = await prisma.conversations.findFirst({
    //   where: {
    //     participants: {
    //     }
    //   }
    // })

    // if exisiting conversation,
  });

  socket.on(
    "send message",
    async (message: string, room: string, senderId: string) => {
      io.to(room).emit("message sent", message, senderId);
      // save message to database
    },
  );
});
