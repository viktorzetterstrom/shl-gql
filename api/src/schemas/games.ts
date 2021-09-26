import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Game {
  @Field()
  gameId!: string;
}
