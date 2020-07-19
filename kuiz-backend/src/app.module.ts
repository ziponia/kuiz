import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { PrismaService } from "./prisma/prisma.service";
import { GameModule } from "./game/game.module";
import { Request } from "express";
import { TokenService } from "./token/token.service";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      context: ctx => {
        const req = ctx.req as Request;

        console.log("ctx: ", req.cookies);
        return {};
      },
      definitions: {
        path: join(process.cwd(), "src/models/schema.ts"),
        outputAs: "class",
        emitTypenameField: true,
      },
    }),
    UserModule,
    MessageModule,
    GameModule,
  ],
  providers: [AppService, PrismaService, TokenService],
})
export class AppModule {}
