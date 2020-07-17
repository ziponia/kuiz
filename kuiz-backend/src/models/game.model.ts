import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/models/user.model";
import { Qna } from "./qna.model";

@ObjectType()
export class Game {
  @Field(type => String)
  id: string;

  @Field(type => User)
  author?: User;

  @Field(type => [Qna])
  questions?: Qna[] = [];
}
