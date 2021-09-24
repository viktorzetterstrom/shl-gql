import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class StandingsEntry {
  @Field()
  teamCode!: string;
}

@InputType()
export class StandingsInput {
  @Field()
  year!: string;
}
