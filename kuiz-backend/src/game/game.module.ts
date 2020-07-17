import { Module } from "@nestjs/common";
import { GameResolver } from "./game.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [GameResolver, PrismaService],
})
export class GameModule {}
