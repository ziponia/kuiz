export interface CreateTokenRequest {
  id: string;
  provider: string; // google,
}

export interface ITokenPayload {
  user: {
    name: string;
    email: string;
    image: string;
  };
  account: {
    provider: "google";
    type: "oauth";
    id: string;
    accessToken: string;
    accessTokenExpires: null;
  };
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: "ko";
  iat: number;
}
