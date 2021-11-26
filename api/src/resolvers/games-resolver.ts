import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { format as formatDate } from "date-fns";
import { Context } from "..";
import { GameApiResponse, GamesApiResponse } from "../data-sources";
import { Game, GameInput, StatisticsInput } from "../schemas";
import { GameDay } from "../schemas/game-day";
import { getTeamNameFromTeamCode } from "./utils/get-team-name-from-team-code";

const formatGameApiResponse = (response: GameApiResponse): Game => ({
  gameId: String(response.game_id),
  date: formatDate(new Date(response.start_date_time), "yyyy-MM-dd"),
  time: formatDate(new Date(response.start_date_time), "HH:mm"),
  homeTeamCode: response.home_team_code,
  homeTeamName: getTeamNameFromTeamCode(response.home_team_code),
  awayTeamCode: response.away_team_code,
  awayTeamName: getTeamNameFromTeamCode(response.away_team_code),
  result: `${response.home_team_result}-${response.away_team_result}`,
});

const formatGamesApiResponse = (response: GamesApiResponse): Game[] =>
  response.map(formatGameApiResponse);

const formatGameDayApiResponse = (response: GamesApiResponse): GameDay[] => {
  const days = response.map(formatGameApiResponse).reduce(
    (acc, curr) => ({
      ...acc,
      [curr.date]: acc[curr.date] ? [...acc[curr.date], curr] : [curr],
    }),
    {} as { [date: string]: Game[] }
  );

  return Object.entries(days).map(([date, games]) => ({ date, games }));
};

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

@Resolver(() => GameDay)
export class GameDaysResolver {
  @Query(() => [GameDay], { nullable: true })
  async gameDays(
    @Arg("input") { year }: StatisticsInput,
    @Ctx() context: Context
  ): Promise<GameDay[]> {
    const response = await context.dataSources.shl.season(year).games();

    return formatGameDayApiResponse(response);
  }
}
