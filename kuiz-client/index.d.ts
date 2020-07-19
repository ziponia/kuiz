import { NextPageContext } from "next";

declare module "next-auth";
declare module "next-auth/providers";

declare module "next-auth/client" {
  export interface AuthUser {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: Date;
  }
  export const useSession;
  export const signin = (): Promise<any> => undefined;
  export const signout = () => undefined;

  export const Provider: React.Context.Provider;

  export const getSession: (ctx: NextPageContext) => Promise<AuthUser>;
  export const setOptions: ({ site: string }) => void;
}
