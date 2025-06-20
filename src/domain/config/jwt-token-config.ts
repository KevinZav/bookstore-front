export class JwtTokenConfig {
  private static readonly tokenKey: string = 'token';

  public static get(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public static set(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}