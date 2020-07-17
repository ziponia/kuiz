import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UserModule,
    MessageModule,
  ],
  providers: [AppService, PrismaService],
})
export class AppModule {}
