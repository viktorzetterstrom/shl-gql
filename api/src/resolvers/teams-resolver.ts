import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { TeamApiResponse, TeamsApiResponse } from "../data-sources";
import { TeamInput, Team } from "../schemas";

const formatTeamApiResponse = (row: TeamApiResponse): Team => ({
  teamCode: row.facts.team_code,
  golds: row.facts.golds,
  finals: row.facts.finals,
  founded: row.facts.founded,
  holyNumbers: row.facts.holy,
});

const formatTeamsApiResponse = (response: TeamsApiResponse): Team[] =>
  response.map((team) => ({
    teamCode: team.team_code,
    golds: team.golds,
    finals: team.finals,
    founded: team.founded,
    holyNumbers: team.holy,
  }));

@Resolver(() => Team)
export class TeamsResolver {
  @Query(() => Team, { nullable: true })
  async team(
    @Arg("input") { teamCode }: TeamInput,
    @Ctx() context: Context
  ): Promise<Team> {
    const response = await context.dataSources.shl.team(teamCode);

    return formatTeamApiResponse(response);
  }

  @Query(() => [Team])
  async teams(@Ctx() context: Context): Promise<Team[]> {
    const response = await context.dataSources.shl.teams();

    return formatTeamsApiResponse(response);
  }
}
