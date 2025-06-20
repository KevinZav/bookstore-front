import type { RolesType, User } from "../../domain";
import type { UserPayload } from "../models";

export class UserMapper {
  public static userResponseToEntity(response: UserPayload) {
    const { email, name, role, password } = response;
    const formatRole = role as RolesType;
    const user: User = {
      email,
      name,
      role: formatRole,
      password: password
    }

    return user;
  }

  public static entityToPayload(user: User) {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password
    };
    return payload;
  }
}