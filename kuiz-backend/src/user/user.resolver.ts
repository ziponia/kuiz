import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";

import { User } from "./user.model";
import { PrismaService } from "src/prisma/prisma.service";

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => User)
  async user(): Promise<User> {
    return {
      id: "1",
      email: "thtjwls",
    };
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany({});
    return users.map(user => ({
      id: user.id,
      email: user.userName,
    }));
  }

  @Mutation(returns => User)
  async createUser(
    @Args({ name: "username", type: () => String }) userName: string,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        userName,
      },
    });
    return {
      id: user.id,
      email: user.userName,
    };
  }
}
