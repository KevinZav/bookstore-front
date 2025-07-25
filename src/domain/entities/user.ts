export interface User {
  email: string;
  name: string;
  password?: string;
  validatePassword?: string;
}

export interface AuthUser {
  username: string;
  password: string;
}