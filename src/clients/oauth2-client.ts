export interface OAuth2Client {
  getAccessToken(code: string): Promise<string>;
  getUserInfo<T = any>(accessToken: string): Promise<T>;
  getAuthenticatorUrl(): string;
  getLogoutUrl(redirectUri: string): string;
}
