import { UserDatasource, UserRepository, type AuthUser, type User } from "../../domain";

export class UserRepositoryImpl extends UserRepository {
  getAll(email: string): Promise<User[]> {
    return this.datasource.getAll(email);
  }
  private datasource: UserDatasource;

  constructor(datasource: UserDatasource) {
    super();
    this.datasource = datasource;
  }

  login(payload: AuthUser): Promise<Partial<User>> {
    return this.datasource.login(payload);
  }

  sign(payload: User): Promise<Partial<User>> {
    return this.datasource.sign(payload);
  }

  get(): Promise<User> {
    return this.datasource.get();
  }
}