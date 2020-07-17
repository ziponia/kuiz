import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next";

const options = {
  site: "https://example.com",
  providers: [
    // OAuth authentication providers
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Sign in with passwordless email link
    Providers.Email({
      server: process.env.MAIL_SERVER,
      from: "<no-reply@example.com>",
    }),
  ],
  // SQL or MongoDB database (or leave empty)
  database: process.env.DATABASE_URL,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
