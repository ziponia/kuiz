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
    return Promise.resolve({ ...token, ...oAuthProfile });
  },
  session: async (session, token) => {
    return Promise.resolve(session);
  },
};

const options = {
  site: "http://localhost:3000",
  providers,
  callbacks,
  events,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SIGN_KEY || "develop-sign-key", // 지정되지 않은 경우 자동 생성 된 비밀.
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
