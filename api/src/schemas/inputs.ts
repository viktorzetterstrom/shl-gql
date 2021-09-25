import { Field, InputType } from "type-graphql";
import { Team } from "./teams";

@InputType()
export class TeamInput implements Partial<Team> {
  @Field()
  teamCode!: string;
}

@InputType()
export class StatisticsInput {
  @Field()
  year!: string;
}
