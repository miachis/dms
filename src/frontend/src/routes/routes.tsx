import { Signup } from "../pages/Signup.tsx";
import App from "../App.tsx";
import { Login } from "../pages/Login.tsx";
import { PrivacyPolicy } from "../pages/PrivacyPolicy.tsx";
import { DeleteAccount } from "../pages/DeleteAccount.tsx";
import { TermsOfService } from "../pages/TermsOfService.tsx";
import { Dashboard } from "../pages/Dashboard.tsx";
import { Profile } from "../components/Profile.tsx";
import { Messages } from "../components/Messages.tsx";
import { Search } from "../components/Search.tsx";
import { Chat } from "../components/Chat.tsx";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/delete-account",
    element: <DeleteAccount />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "profile", element: <Profile /> },
      {
        path: "messages",
        element: <Messages />,
        children: [{ path: ":id", element: <Chat /> }],
      },
      { path: "search", element: <Search /> },
    ],
  },
]);
