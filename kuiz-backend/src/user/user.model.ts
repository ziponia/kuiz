import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(type => String)
  id: string;

  @Field({ nullable: false })
  email: string;
}
