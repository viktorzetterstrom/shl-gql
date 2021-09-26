import { Field, InputType } from "type-graphql";
import { Game } from "./games";
import { Team } from "./teams";

@InputType()
export class GameInput implements Partial<Game> {
  @Field()
  gameId!: string;

  @Field()
  year!: string;
}

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
