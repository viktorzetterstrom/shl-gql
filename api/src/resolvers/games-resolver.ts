import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "..";
import { GameApiResponse, GamesApiResponse } from "../data-sources";
import { Game, GameInput, StatisticsInput } from "../schemas";

const formatGameApiResponse = (response: GameApiResponse): Game => ({
  gameId: String(response.game_id),
});

const formatGamesApiResponse = (response: GamesApiResponse): Game[] =>
  response.map((game) => ({
    gameId: String(game.game_id),
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

  @Query(() => [Game])
  async games(
    @Arg("input") { year }: StatisticsInput,
    @Ctx() context: Context
  ): Promise<Game[]> {
    const response = await context.dataSources.shl.season(year).games();

    return formatGamesApiResponse(response);
  }
}
