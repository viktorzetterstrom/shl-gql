import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Game {
  @Field()
  gameId!: string;

  @Field()
  time!: string;

  @Field()
  homeTeamCode!: string;

  @Field()
  homeTeamName!: string;

  @Field()
  awayTeamCode!: string;

  @Field()
  awayTeamName!: string;

  @Field()
  result!: string;
}
