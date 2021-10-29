import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { GoalieApiResponse, SkaterApiResponse } from "../data-sources";
import { Goalie, GoaliesInput, Skater, SkatersInput } from "../schemas";

const formatGoaliesApiResponse = (response: GoalieApiResponse): Goalie[] =>
  response.map((goalie) => ({
    // General information
    playerId: goalie.player_id,
    firstName: goalie.info.first_name,
    lastName: goalie.info.last_name,
    position: "G",
    birthDate: goalie.info.birthdate,
    nationality: goalie.info.nationality,
    number: goalie.info.number,
    height: goalie.info.height,
    weight: goalie.info.weight,
    gamesPlayed: goalie.gp,
    rank: goalie.rank,
    validRanking: goalie.valid_ranking,

    // Goalie-specific stats
    gamesPlayedOnIce: goalie.gpi,
    goalsAgainst: goalie.ga,
    goalsAgainstAverage: goalie.gaa,
    gamesStarted: goalie.gs,
    minutesInPlay: goalie.mip,
    shutOuts: goalie.so,
    shotsOnGoal: goalie.soga,
    saves: goalie.svs,
    savesPercentage: goalie.svsperc,
    wins: goalie.w,
    ties: goalie.t,
    losses: goalie.l,
  }));

const formatSkatersApiResponse = (response: SkaterApiResponse): Skater[] =>
  response.map((skater) => ({
    // General information
    playerId: skater.player_id,
    firstName: skater.info.first_name,
    lastName: skater.info.last_name,
    position: skater.info.position,
    number: skater.info.number,
    height: skater.info.height,
    nationality: skater.info.nationality,
    birthDate: skater.info.birthdate,
    weight: skater.info.weight,
    gamesPlayed: skater.gp,
    rank: skater.rank,
    validRanking: true,

    // Skater-specific stats
    totalOnIceSeconds: skater.toi,
    totalOnIce: skater.toi_gp,
    assists: skater.a,
    blockedShots: skater.bk_s,
    goals: skater.g,
    gameWinningGoals: skater.gwg,
    hits: skater.hits,
    minus: skater.minus,
    penaltyMinutes: skater.pim,
    powerPlayGoals: skater.ppg,
    plus: skater.plus,
    plusMinus: skater.plus_minus,
    shotsOnGoal: skater.sog,
    totalPoints: skater.tp,
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
