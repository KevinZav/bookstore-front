import axios from "axios";
import { EnvironmentConfig, JwtTokenConfig } from "../../domain";

export class MarketConnection {

  public static get connect() {
    const marketConnection = axios.create({
      baseURL: EnvironmentConfig.apiKey
    });
    marketConnection.interceptors.request.use((config) => {
      const token = JwtTokenConfig.get();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
    
    return marketConnection;
  }
}