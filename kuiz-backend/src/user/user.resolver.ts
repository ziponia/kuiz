import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/models/schema";
// import { User } from "../models/user.model";

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      take: 5,
      include: {
        games: true,
      },
    });
    return users;
  }
}
