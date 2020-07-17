import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Game } from "src/models/game.model";

@ObjectType()
export class User {
  @Field(type => String)
  id: string;

  @Field({ nullable: false })
  email: string;

  @Field(type => [Game])
  games?: Game[];
  @Field(type => String)
  profile_pic?: string;
  @Field(type => Date)
  createdAt?: Date;
  @Field(type => Date)
  lastUpdateAt?: Date;
}
