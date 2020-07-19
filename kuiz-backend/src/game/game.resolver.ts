import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PrismaService } from "src/prisma/prisma.service";
import { Game, AddGameInput } from "src/models/schema";
// import { Game, AddGameInput } from "../models/game.model";

// @Resolver(of => Game)
export class GameResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(returns => Game)
  async addGame(@Args("input") input: [AddGameInput]): Promise<Game> {
    console.log("add Game! :", input);
    return {
      id: "test id",
    };
  }
}
