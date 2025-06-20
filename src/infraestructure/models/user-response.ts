export interface UserResponse {
  token:   string;
  payload: UserPayload;
}

export interface UserPayload {
  id?: string;
  role:  string;
  email: string;
  name:  string;
  password?: string;
}

export interface UsersResponse {
  users: UserPayload[]
}