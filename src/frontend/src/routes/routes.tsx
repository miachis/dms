import { Signup } from "../pages/Signup.tsx";
import App from "../App.tsx";
import { Login } from "../pages/Login.tsx";
import { PrivacyPolicy } from "../pages/PrivacyPolicy.tsx";
import { DeleteAccount } from "../pages/DeleteAccount.tsx";
import { TermsOfService } from "../pages/TermsOfService.tsx";
import { Dashboard } from "../pages/Dashboard.tsx";

interface Routes {
  path: string;
  element: React.JSX.Element;
}

export const routes: Routes[] = [
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
  },
];
