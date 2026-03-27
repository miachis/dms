export type Inputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export interface APIResponse {
  success: string;
  error?: string;
  token?: string;
}

export interface APIErrorResponse {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
