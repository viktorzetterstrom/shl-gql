/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { Team, TeamInput } from "../schemas/team";

const formatTeamResponse = (response: any) => ({
  teamCode: response.team_code,
  golds: response.golds,
  finals: response.finals,
  founded: response.founded,
  holyNumbers: response.holy,
});

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
    console.log(response);
    return response.map(formatTeamResponse);
  }
}
