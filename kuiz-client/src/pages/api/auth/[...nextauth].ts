import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import jwt from "jsonwebtoken";
import { AuthMetadata, AuthToken } from "../../../interface/auth.interface";

const providers = [
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
];

const events = {
  signin: async message => {
    /* on successful sign in */
    console.log("event: signin: ");
  },
  signout: async message => {
    /* on signout */
    console.log("event: signout: ");
  },
  createUser: async message => {
    /* user created */
    console.log("event: createUser: ");
  },
  linkAccount: async message => {
    /* account linked to a user */
    console.log("event: linkAccount: ");
  },
  session: async message => {
    /* session is active */
    console.log("event: session: ");
  },
  error: async message => {
    /* error in authentication flow */
    console.log("event: error: ");
  },
};

const callbacks = {
  signin: async (profile, account, metadata) => {
    console.log("callback: signin -> ");
    let isAllowedToSignIn = true;
    try {
      const { data } = await axios.post(`http://localhost:3001/user/sign`, {
        profile,
        account,
        metadata,
      });
    } catch (e) {
      console.log(e);
      isAllowedToSignIn = false;
    }
    if (isAllowedToSignIn) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  },
  redirect: async (url, baseUrl) => {
    console.log("callback: redirect -> ");
  },

  jwt: async (token: AuthToken, oAuthProfile: AuthMetadata) => {
    console.log("callback: JWT -> ", token);
    return Promise.resolve(token);
  },
};

const options = {
  site: "http://localhost:3000",
  providers,
  callbacks,
  events,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SIGN_KEY || "develop-sign-key", // 지정되지 않은 경우 자동 생성 된 비밀.
    // 기본적으로 JSON 웹 토큰은 SHA256으로 서명되고 AES로 암호화됩니다.
    //
    // 서명 + 암호화를위한 고유 한 인코딩 / 디코딩 함수를 정의 할 수있는 경우
    // 기본 동작을 무시하거나 정보를 추가 / 제거하려는 경우
    // 인코딩 될 때 JWT에서).
    encode: async ({ secret, key, token, maxAge }) => {
      return jwt.sign(token, secret);
    },
    decode: async ({ secret, key, token, maxAge }) => {
      return jwt.decode(token, { json: true });
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
