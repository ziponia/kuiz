import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  providers: [UserResolver, PrismaService, UserService],
  controllers: [UserController],
  imports: [PrismaService],
})
export class UserModule {}
