import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import styles from "../static/Dashboard.module.css";
import { DashboardContext } from "../contexts/useUserContext";
import { type APIResponse } from "../types/signUpTypes";

export function Dashboard() {
  const [data, setData] = useState<APIResponse>({
    success: "",
    response: { email: "", profilePicture: "", id: "", username: "" },
  });
  const navigate = useNavigate();

  const updateProfilePicture = (url: string) => {
    setData((prev) => {
      return {
        ...prev,
        response: prev.response
          ? { ...prev.response, profilePicture: url }
          : prev.response,
      };
    });
  };

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

  if (data.response!.id === "") return;

  return data ? (
    <div id={styles.dashboard}>
      <Sidebar />
      <DashboardContext.Provider value={{ ...data, updateProfilePicture }}>
        <Outlet />
      </DashboardContext.Provider>
    </div>
  ) : (
    <p>No user found</p>
  );
}
