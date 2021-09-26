import { Field, InputType, registerEnumType } from "type-graphql";
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

export enum GoaliesSortOrder {
  Saves = "saves",
  SavesPercent = "savesPercent",
  GoalsAgainst = "goalsAgainst",
  GoalsAgainstAverage = "goalsAgainstAverage",
  Won = "won",
  Tied = "tied",
  Lost = "lost",
  ShooutOuts = "shooutOuts",
  MinutesInPlay = "minutesInPlay",
}
registerEnumType(GoaliesSortOrder, { name: "GoaliesSortOrder" });

export enum SkatersSortOrder {
  Assists = "assists",
  Goals = "goals",
  Points = "points",
  Hits = "hits",
  PenaltyMinutes = "pim",
  PlusMinus = "plusminus",
}
registerEnumType(SkatersSortOrder, { name: "SkatersSortOrder" });

@InputType()
export class SkatersInput extends StatisticsInput {
  @Field(() => SkatersSortOrder, {
    nullable: true,
    defaultValue: SkatersSortOrder.Points,
  })
  sortOrder!: SkatersSortOrder;
}

@InputType()
export class GoaliesInput extends StatisticsInput {
  @Field(() => GoaliesSortOrder, {
    nullable: true,
    defaultValue: GoaliesSortOrder.SavesPercent,
  })
  sortOrder!: GoaliesSortOrder;
}
