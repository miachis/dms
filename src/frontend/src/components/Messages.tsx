import { useState, useEffect, useRef } from "react";
import styles from "../static/Messages.module.css";
import { useNavigate, Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "../contexts/useUserContext";

type Response = {
  id: string;
  email: string;
  profilePicture: string;
  username: string;
}[];

export function Messages() {
  const [users, setUsers] = useState<Response>([]);
  const { response } = useUserContext(); //holds the current user
  const data = useUserContext();
  const navigate = useNavigate();
  const webSocketServer = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("ws://localhost:4000");
    webSocketServer.current = socket;
    getUsersAndConnect();
  }, []);

  const getUsersAndConnect = async () => {
    await getAllUsers();
    if (!data) {
      return;
    } else {
      webSocketServer.current!.emit("send_id", data.response!.id);
    }
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data.response);
    } catch (error) {
      return;
    }
  };

  const toChat = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div id={styles.messagesGrid}>
      {users && users.length > 0 ? (
        <ul id={styles.usersUl}>
          {users.map((user) =>
            user.id != response?.id ? (
              <div
                className={styles.usersContainer}
                onClick={() => {
                  toChat(user.id);
                }}
              >
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "/profile-picture.png"
                  }
                  alt={user.username + "profile picture"}
                  height={30}
                  className={styles.profilePicture}
                />
                <li className={styles.users} key={user.id}>
                  {user.username}
                </li>
              </div>
            ) : (
              ""
            ),
          )}
        </ul>
      ) : (
        <p>no user</p>
      )}
      <Outlet context={webSocketServer} />
    </div>
  );
}
