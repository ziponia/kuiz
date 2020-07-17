declare module "next-auth";
declare module "next-auth/providers";

declare module "next-auth/client" {
  export const useSession;
  export const signin = (): Promise<any> => undefined;
  export const signout = () => undefined;

  export const Provider: React.Context.Provider;
}
