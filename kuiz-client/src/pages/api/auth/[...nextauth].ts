import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const providers = [
  // OAuth authentication providers
  Providers.Apple({
    clientId: process.env.APPLE_ID,
    clientSecret: process.env.APPLE_SECRET,
  }),
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
];

const callbacks = {
  signin: async (profile, account, metadata) => {
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
    console.log("signin => ", profile, account, metadata);
    if (isAllowedToSignIn) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  },
  redirect: async (url, baseUrl) => {},

  jwt: async (token, oAuthProfile) => Promise.resolve(token),
};

const options = {
  site: "http://localhost:3000",
  providers,
  callbacks,
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
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
