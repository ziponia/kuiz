import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Game } from "./game.model";

@ObjectType()
export class Qna {
  @Field(type => String)
  id: string;

  @Field(type => String)
  question: string;

  @Field(type => String)
  answer: string;

  @Field(type => Game)
  game: Game;
}
