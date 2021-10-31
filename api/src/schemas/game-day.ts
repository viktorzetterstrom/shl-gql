import { Field, ObjectType } from "type-graphql";
import { Game } from "./";

@ObjectType()
export class GameDay {
  @Field()
  date!: string;

  @Field(() => [Game])
  games!: Game[];
}
