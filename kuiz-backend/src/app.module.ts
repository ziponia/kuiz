import { Module, MiddlewareConsumer } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { PrismaService } from "./prisma/prisma.service";
import { GameModule } from "./game/game.module";
import { Request } from "express";
import { TokenService, tokenDecode } from "./token/token.service";
import { tokenMiddleware } from "./middleware/token.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      context: async ctx => {
        const req = ctx.req as Request;
        return {
          user: tokenDecode(req.headers["authorization"]),
        };
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenMiddleware).forRoutes("/graphql");
  }
}
