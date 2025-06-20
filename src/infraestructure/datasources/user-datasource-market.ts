import { JwtTokenConfig, UserDatasource, type AuthUser, type User } from "../../domain";
import { MarketConnection } from "../connection/market-connection";
import { UserMapper } from "../mappers";
import type { UserPayload, UserResponse, UsersResponse } from "../models";

export class UserDatasourceMarket extends UserDatasource {
  async login(payload: AuthUser): Promise<Partial<User>> {
    const response = await MarketConnection.connect.post<UserResponse>('/auth/login', payload);

    const { token } = response.data;
    JwtTokenConfig.set(token);

    return UserMapper.userResponseToEntity(response.data.payload);
  }
  async sign(payload: User): Promise<Partial<User>> {
    const body = UserMapper.entityToPayload(payload);
    const response = await MarketConnection.connect.post<UserResponse>('/auth/register', body);
    
    const { token } = response.data;
    JwtTokenConfig.set(token);

    return UserMapper.userResponseToEntity(response.data.payload);
  }
  async get(): Promise<User> {
    const response = await MarketConnection.connect.get<UserPayload>('/auth/info');
    return UserMapper.userResponseToEntity(response.data);
  }

  async getAll(email: string): Promise<User[]> {
    const response = await MarketConnection.connect.get<UsersResponse>('/auth/all', {
      params: {
        search: email
      }
    });

    return response.data.users.map((item) => UserMapper.userResponseToEntity(item));
  }
}