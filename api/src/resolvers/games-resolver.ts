import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { GameApiResponse, GamesApiResponse } from "../data-sources";
import { Game, GameInput, StatisticsInput } from "../schemas";
import { getTeamNameFromTeamCode } from "./utils/getTeamNameFromTeamCode";

const formatGameApiResponse = (response: GameApiResponse): Game => ({
  gameId: String(response.game_id),
  time: response.start_date_time,
  homeTeamCode: response.home_team_code,
  homeTeamName: getTeamNameFromTeamCode(response.home_team_code),
  awayTeamCode: response.away_team_code,
  awayTeamName: getTeamNameFromTeamCode(response.away_team_code),
  result: `${response.home_team_result}-${response.away_team_result}`,
});

const formatGamesApiResponse = (response: GamesApiResponse): Game[] =>
  response.map((game) => ({
    gameId: String(game.game_id),
    time: game.start_date_time,
    homeTeamCode: game.home_team_code,
    homeTeamName: getTeamNameFromTeamCode(game.home_team_code),
    awayTeamCode: game.away_team_code,
    awayTeamName: getTeamNameFromTeamCode(game.away_team_code),
    result: `${game.home_team_result} - ${game.away_team_result}`,
  }));

@Resolver(() => Game)
export class GamesResolver {
  @Query(() => Game, { nullable: true })
  async game(
    @Arg("input") { gameId, year }: GameInput,
    @Ctx() context: Context
  ): Promise<Game> {
    const response = await context.dataSources.shl.season(year).game(gameId);

    return formatGameApiResponse(response);
  }

  @Query(() => [Game], { nullable: true })
  async games(
    @Arg("input") { year }: StatisticsInput,
    @Ctx() context: Context
  ): Promise<Game[]> {
    const response = await context.dataSources.shl.season(year).games();

    return formatGamesApiResponse(response);
  }
}
