export interface AuthProfile {
  name: string;
  email: string;
  image: string;
}

export interface AuthAccount {
  provider: "google";
  type: string;
  id: string;
  accessToken: string;
  accessTokenExpires?: null;
}

export interface AuthMetadata {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: "ko";
}

export interface AuthData {
  profile: AuthProfile;
  account: AuthAccount;
  metadata: AuthMetadata;
}
