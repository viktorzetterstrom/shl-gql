import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { StandingsApiResponse } from "../data-sources";
import { StatisticsInput, StandingsEntry } from "../schemas";
import { getTeamNameFromTeamCode } from "./utils/getTeamNameFromTeamCode";

const formatStandingsResponse = (
  response: StandingsApiResponse
): StandingsEntry[] =>
  response.map((entry) => ({
    teamId: entry.team.id,
    teamCode: entry.team.code,
    teamName: getTeamNameFromTeamCode(entry.team_code),
    rank: entry.rank,
    threePoints: entry.reg_w,
    twoPoints: entry.otw + entry.sow,
    onePoints: entry.otl + entry.sol,
    zeroPoints: entry.reg_l,
    goals: entry.g,
    goalsAgainst: entry.ga,
    plusMinus: entry.diff,
    points: entry.points,
  }));

@Resolver(() => StandingsEntry)
export class StandingsResolver {
  @Query(() => [StandingsEntry], { nullable: true })
  async standings(
    @Arg("input") { year }: StatisticsInput,
    @Ctx() context: Context
  ): Promise<StandingsEntry[]> {
    const response = await context.dataSources.shl
      .season(year)
      .statistics.teams.standings();

    return formatStandingsResponse(response);
  }
}
