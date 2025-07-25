import type { AuthUser, User } from "../../../domain";
import {
  UserDatasourceMarket,
  UserRepositoryImpl,
} from "../../../infraestructure";
import type { store } from "../store";
import { getAll, loadingAll, login, loginError, logout, sign } from "./user-slice";

export type UserDispatch = typeof store.dispatch;

export class UserThunk {
  private static repository = new UserRepositoryImpl(
    new UserDatasourceMarket()
  );

  public static startLogin(payload: AuthUser) {
    return async (dispatch: UserDispatch) => {
      try {
        await this.repository.login(payload);
        const userInfo = await this.repository.get();
        dispatch(login(userInfo));
      } catch (e) {
        dispatch(loginError());
      }
    };
  }

  public static startSign(payload: User) {
    return async (dispatch: UserDispatch) => {
      try {
        const user = await this.repository.sign(payload);
        dispatch(sign(user));
      } catch (e) {
        dispatch(loginError());
      }
    };
  }

  public static startGetInfo() {
    return async (dispatch: UserDispatch) => {
      try {
        const user = await this.repository.get();
        dispatch(login(user));
      } catch(e) {
        dispatch(logout());
      }
    }
  }

  public static startLogout() {
    return async (dispatch: UserDispatch) => {
      dispatch(logout());
    }
  }

  public static startGetAll(email: string) {
    return async (dispatch: UserDispatch) => {
      try {
        dispatch(loadingAll())
        const users = await this.repository.getAll(email);
        dispatch(getAll(users));
      } catch(e) {
        dispatch(logout());
      }
    }
  }
}
