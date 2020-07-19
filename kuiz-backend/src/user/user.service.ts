import { Injectable } from "@nestjs/common";
import { AuthData } from "./user.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenService } from "src/token/token.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  public async sign(data: AuthData) {
    const user = await this.prisma.user.upsert({
      create: {
        email: data.metadata.email,
        profile_pic: data.metadata.picture,
        createdAt: new Date(),
      },
      update: {
        profile_pic: data.metadata.picture,
        lastUpdateAt: new Date(),
      },
      where: {
        email: data.metadata.email,
      },
    });

    return user;
  }

  public async generateToken(id: string, provider: string) {
    return this.tokenService.createToken({ id, provider });
  }
}
