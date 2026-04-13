import { createContext, useContext } from "react";

import type { APIResponse } from "../types/signUpTypes";

export interface DashboardContextType extends APIResponse {
  updateProfilePicture: (url: string) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function useUserContext() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error("User is undefined");
  }

  return user;
}
