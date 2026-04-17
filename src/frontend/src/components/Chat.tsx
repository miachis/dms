import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../static/Chat.module.css";
import { useUserContext } from "../contexts/useUserContext";
import { useOutletContext } from "react-router-dom";
import type { Socket } from "socket.io-client";

type Response = {
  id: string;
  email: string;
  profilePictureURL: string;
  username: string;
};

type APIMessage = {
  id?: number;
  message: string;
  createdAt?: string;
  senderId?: number;
  conversationId?: number;
};

interface APIMessageResponse {
  id?: number;
  createdAt?: string;
  name?: string;
  messages: APIMessage[];
}

export function Chat() {
  const { id } = useParams(); // this id holds the current chat youre in
  const { response } = useUserContext(); // this response holds the current user
  const [receiver, setReceiver] = useState<Response>();
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<APIMessageResponse[]>([]); //populate this state with messages from the database
  const socketRef = useOutletContext<React.RefObject<Socket>>();

  let room: string;
  const senderId = Number(response?.id);
  const receiverId = Number(id);

  if (senderId > receiverId) {
    room = `${senderId}_${receiverId}`;
  } else {
    room = `${receiverId}_${senderId}`;
  }

  useEffect(() => {
    getUserWithId();
    fetchMessages(room);

    const handler = () => {
      displayMessage();
    };

    if (socketRef.current) {
      socketRef.current.on("message sent", handler);
      socketRef.current.emit("join room", room, response?.id);
    }

    return () => {
      socketRef.current.off("message sent", handler);
    };
  }, [id, socketRef.current]);

  const getUserWithId = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `https://dms-3p9o.onrender.com/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setReceiver(data.response);
  };

  const sendMessage = (message: string, room: string, senderId: string) => {
    // Send message to the room here, no need for IDs cause the receipient and sender are already in the room passed in
    socketRef.current.emit("send message", message, room, senderId);
    setInput("");
  };

  const displayMessage = () => {
    fetchMessages(room);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    message: string,
    room: string,
    senderId: string,
  ) => {
    if (e.key === "Enter" && input != "") {
      sendMessage(message, room, senderId);
      return;
    }
  };

  const fetchMessages = async (conversationName: string) => {
    try {
      const response = await fetch(
        `https://dms-3p9o.onrender.com/messages/${conversationName}`,
      );
      const data = await response.json();
      setMessages(data.response);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className={styles.div}>
      <p className={styles.receiverName}>
        {receiver != undefined ? receiver.username : ""}
      </p>
      <div id={styles.chatContainer}>
        {messages.length > 0 ? (
          messages[0].messages.map((message) => {
            return (
              <div
                className={
                  message.senderId === Number(id)
                    ? styles.messageReceived
                    : styles.messageSent
                }
              >
                {message.message}
              </div>
            );
          })
        ) : (
          <p className={styles.startConvo}>Start the conversation</p>
        )}
      </div>
      <div className={styles.chatBox}>
        <textarea
          className={styles.chatInput}
          placeholder="Send your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, input, room, response!.id)}
        />
        <button onClick={() => sendMessage(input, room, response!.id)}>
          Send
        </button>
      </div>
    </div>
  );
}
