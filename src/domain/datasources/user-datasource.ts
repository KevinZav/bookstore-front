import type { AuthUser, User } from "../entities";

export abstract class UserDatasource {
  abstract login(payload: AuthUser): Promise<Partial<User>>;
  abstract sign(payload: User): Promise<Partial<User>>;
  abstract get(): Promise<User>;
  abstract getAll(email: string): Promise<User[]>;
}