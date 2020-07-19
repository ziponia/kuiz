import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TokenService } from "src/token/token.service";

@Module({
  providers: [UserResolver, PrismaService, UserService, TokenService],
  controllers: [UserController],
  imports: [PrismaService],
})
export class UserModule {}
