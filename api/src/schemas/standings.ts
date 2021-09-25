import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StandingsEntry {
  @Field()
  teamCode!: string;
}
