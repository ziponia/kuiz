import { Injectable } from "@nestjs/common";
import { AuthData } from "./user.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async sign(data: AuthData) {
    return await this.prisma.user.upsert({
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
  }
}
