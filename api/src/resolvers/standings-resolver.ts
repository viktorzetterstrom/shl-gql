/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { StandingsEntry, StandingsInput } from "../schemas/standings";

const formatStandingsResponse = (response: any) =>
  response.map((row: any) => ({
    teamCode: row.team.code,
  }));

@Resolver((_of) => StandingsEntry)
export class StandingsResolver {
  @Query((_returns) => [StandingsEntry], { nullable: true })
  async standings(
    @Arg("standingsInput") { year }: StandingsInput,
    @Ctx() context: Context
  ): Promise<StandingsEntry[]> {
    const response = await context.dataSources.shl
      .season(year)
      .statistics.teams.standings();

    return formatStandingsResponse(response);
  }
}
