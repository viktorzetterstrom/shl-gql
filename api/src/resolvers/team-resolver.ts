/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { Team, TeamInput } from "../schemas/team";

const formatTeamResponse = (response: any) =>
  response.map((row: any) => ({
    teamCode: row.team_code,
    golds: row.golds,
    finals: row.finals,
    founded: row.founded,
    holyNumbers: row.holy,
  }));

@Resolver((_of) => Team)
export class TeamResolver {
  @Query((_returns) => Team, { nullable: true })
  async team(
    @Arg("teamInput") { teamCode }: TeamInput,
    @Ctx() context: Context
  ): Promise<Team> {
    const response = await context.dataSources.shl.team(teamCode);
    return formatTeamResponse(response.facts);
  }

  @Query((_returns) => [Team])
  async teams(@Ctx() context: Context): Promise<Team[]> {
    const response = await context.dataSources.shl.teams();

    return formatTeamResponse(response);
  }
}
