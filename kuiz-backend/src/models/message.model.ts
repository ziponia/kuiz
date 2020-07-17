import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/models/user.model";

@ObjectType()
export class Message {
  @Field(type => String)
  messageId?: string;

  @Field()
  message?: string;

  @Field(type => User, { nullable: true })
  sender?: User;
}