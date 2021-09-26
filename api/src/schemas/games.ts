import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Game {
  @Field()
  gameId!: string;

  @Field()
  time!: string;

  @Field()
  home!: string;

  @Field()
  away!: string;

  @Field()
  result!: string;
}
