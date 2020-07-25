import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { CreateTokenRequest, ITokenPayload } from "./token.interface";
import { PrismaService } from "src/prisma/prisma.service";

export const tokenDecode = (authorizationHeader: string): ITokenPayload => {
  const sp = authorizationHeader.split(" ");
  const decode = jwt.verify(sp[1], process.env.JWT_SIGN_KEY) as ITokenPayload;
  return decode;
};

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}
  async createToken(data: CreateTokenRequest): Promise<string> {
    console.log("find SIGN_KEY: ", process.env.JWT_SIGN_KEY);
    return jwt.sign({ ...data }, process.env.JWT_SIGN_KEY, {
      expiresIn: 60 * 60 * 6,
    });
  }
}
