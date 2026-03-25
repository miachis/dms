import { Signup } from "../pages/Signup.tsx";
import App from "../App.tsx";
import { Login } from "../pages/Login.tsx";

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
    path: "login",
    element: <Login />,
  },
];
