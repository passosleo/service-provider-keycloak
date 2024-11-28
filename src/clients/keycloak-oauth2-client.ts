import { OAuth2Client } from './oauth2-client';
import axios from 'axios';

type KeycloakOAuth2ClientConfig = {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export class KeycloakOAuth2Client implements OAuth2Client {
  private config: KeycloakOAuth2ClientConfig;

  public constructor(config: KeycloakOAuth2ClientConfig) {
    this.config = config;
  }

  public getAuthenticatorUrl() {
    const authUrl = `${this.config.baseUrl}/realms/${this.config.realm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    });
    return `${authUrl}?${params.toString()}`;
  }

  getLogoutUrl(redirectUri: string) {
    return `${this.config.baseUrl}/realms/${this.config.realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
  }

  async getAccessToken(code: string) {
    const response = await axios.post(
      `${this.config.baseUrl}/realms/${this.config.realm}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error('Failed to obtain access token');
    }
  }

  async getUserInfo(accessToken: string) {
    const response = await axios.get(
      `${this.config.baseUrl}/realms/${this.config.realm}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to obtain user info');
    }
  }
}
