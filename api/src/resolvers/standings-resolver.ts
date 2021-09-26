import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { StandingsApiResponse } from "../data-sources";
import { StatisticsInput, StandingsEntry } from "../schemas";

const formatStandingsResponse = (
  response: StandingsApiResponse
): StandingsEntry[] =>
  response.map((row) => ({
    teamCode: row.team.code,
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
