import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { Game, AddGameInput, Qna } from "src/models/schema";
import { ITokenPayload } from "src/token/token.interface";
import { Res } from "@nestjs/common";
// import { Game, AddGameInput } from "../models/game.model";

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(returns => Game)
  async addGame(
    @Context() { user }: { user: ITokenPayload },
    @Args("input") input: AddGameInput[],
  ): Promise<Game> {
    const game = await this.prisma.game.create({
      data: {
        author: {
          connect: { email: user.email },
        },
      },
    });

    for (let i of input) {
      await this.prisma.qnA.create({
        data: {
          ...i,
          game: {
            connect: { id: game.id },
          },
        },
      });
    }

    return game;
  }
}
