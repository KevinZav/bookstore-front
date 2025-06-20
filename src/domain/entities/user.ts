import type { RolesType } from "../types";

export interface User {
  email: string;
  name: string;
  password?: string;
  validatePassword?: string;
  role: RolesType;
}

export interface AuthUser {
  email: string;
  password: string;
}