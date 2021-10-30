import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StandingsEntry {
  @Field()
  teamId!: string;

  @Field()
  teamCode!: string;

  @Field()
  teamName!: string;

  @Field()
  rank!: number;

  @Field()
  threePoints!: number;

  @Field()
  twoPoints!: number;

  @Field()
  onePoints!: number;

  @Field()
  zeroPoints!: number;

  @Field()
  goals!: number;

  @Field()
  goalsAgainst!: number;

  @Field()
  plusMinus!: number;

  @Field()
  points!: number;
}
