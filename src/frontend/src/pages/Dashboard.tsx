import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  success: boolean;
  response: { email: string; password: string };
}

export function Dashboard() {
  const [data, setData] = useState<UserData>();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await fetch(
          "http://localhost:3000/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setData(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {data ? <h1>Welcome {data.response.email}</h1> : <p>No user found</p>}
    </div>
  );
}
