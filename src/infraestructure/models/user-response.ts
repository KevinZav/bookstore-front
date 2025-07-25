export interface UserResponse {
  token:   string;
  payload: UserPayload;
}

export interface UserPayload {
  id?: string;
  username: string;
  name:  string;
  password?: string;
}

export interface UsersResponse {
  users: UserPayload[]
}