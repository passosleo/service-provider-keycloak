export interface OAuth2Client {
  getOpenIdConfig(): Promise<{
    authorization_endpoint: string;
    token_endpoint: string;
    end_session_endpoint: string;
  }>;
  getAccessToken(code: string): Promise<string>;
  getUserInfo<T = any>(accessToken: string): Promise<T>;
  getAuthenticatorUrl(): Promise<string>;
  getLogoutUrl(redirectUri: string): Promise<string>;
}
