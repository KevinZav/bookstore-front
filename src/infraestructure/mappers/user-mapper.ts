import type { User } from "../../domain";
import type { UserPayload } from "../models";

export class UserMapper {
  public static userResponseToEntity(response: UserPayload) {
    const { username, password } = response;
    const user: User = {
      email: username,
      name: '',
      password: password
    }

    return user;
  }

  public static entityToPayload(user: User) {
    const payload: UserPayload = {
      username: user.email,
      name: user.name,
      password: user.password
    };
    return payload;
  }
}