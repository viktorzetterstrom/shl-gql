import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { GoalieApiResponse, SkaterApiResponse } from "../data-sources";
import { Goalie, GoaliesInput, Skater, SkatersInput } from "../schemas";

const formatGoaliesApiResponse = (response: GoalieApiResponse): Goalie[] =>
  response.map((goalie) => ({
    playerId: goalie.player_id,
    firstName: goalie.info.first_name,
    lastName: goalie.info.last_name,
    goalsAgainst: goalie.gaa,
  }));

const formatSkatersApiResponse = (response: SkaterApiResponse): Skater[] =>
  response.map((skater) => ({
    playerId: skater.player_id,
    firstName: skater.info.first_name,
    lastName: skater.info.last_name,
    goals: skater.g,
  }));

@Resolver(() => Goalie)
export class GoaliesResolver {
  @Query(() => [Goalie], { nullable: true })
  async goalies(
    @Arg("input") { year, sortOrder }: GoaliesInput,
    @Ctx() context: Context
  ): Promise<Goalie[]> {
    const response = await context.dataSources.shl
      .season(year)
      .statistics.goalies(sortOrder);

    return formatGoaliesApiResponse(response);
  }
}

@Resolver(() => Skater)
export class SkatersResolver {
  @Query(() => [Skater], { nullable: true })
  async skaters(
    @Arg("input") { year, sortOrder }: SkatersInput,
    @Ctx() context: Context
  ): Promise<Skater[]> {
    const response = await context.dataSources.shl
      .season(year)
      .statistics.skaters(sortOrder);

    return formatSkatersApiResponse(response);
  }
}
