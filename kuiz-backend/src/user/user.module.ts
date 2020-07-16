import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [UserResolver, PrismaService],
  // imports: [PrismaService],
})
export class UserModule {}
