import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PrismaService } from "src/prisma/prisma.service";
import { Game } from "../models/game.model";

@Resolver(of => Game)
export class GameResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [Game])
  async games(): Promise<Game[]> {
    const games = await this.prisma.game.findMany({
      include: {
        author: true,
        questions: false,
      },
    });
    return games;
  }
}
