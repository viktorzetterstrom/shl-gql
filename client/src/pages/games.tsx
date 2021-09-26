import type { NextPage } from "next";
import { client } from "../graphql/apollo-client";
import { GamesDocument, Game, GamesQuery } from "../generated/graphql";

interface GamesProps {
  games: GamesQuery["games"];
}

const Games: NextPage<GamesProps> = ({ games }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Home</th>
            <th>Away</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {games?.map((game) => (
            <tr key={game.gameId}>
              <td>{game.time}</td>
              <td>{game.home}</td>
              <td>{game.away}</td>
              <td>{game.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<GamesQuery>({
    query: GamesDocument,
    variables: {
      input: {
        year: "2021",
      },
    },
  });

  return {
    props: {
      games: data.games,
    },
  };
}

export default Games;
