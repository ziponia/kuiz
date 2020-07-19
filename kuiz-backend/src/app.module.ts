import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { PrismaService } from "./prisma/prisma.service";
import { GameModule } from "./game/game.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      debug: true,
      playground: true,
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
  providers: [AppService, PrismaService],
})
export class AppModule {}
