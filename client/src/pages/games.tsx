import type { NextPage } from "next";
import Image from "next/image";
import { client } from "../graphql/apollo-client";
import { format } from "date-fns";
import { GamesDocument, GamesQuery } from "../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../config/static-page-revalidate-seconds";
import { StyledTable } from "../components/styled-table";
import { useMediaQuery } from "../utils/useMediaQuery";

interface GamesProps {
  games: GamesQuery["games"];
}

const formatGameTime = (gameTimeString: string) =>
  format(new Date(gameTimeString), "dd-LLL HH:mm").toLowerCase();

const Games: NextPage<GamesProps> = ({ games }) => {
  const isSmallScreen = useMediaQuery("(min-width: 420px)");

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>time</th>
            <th colSpan={3}>teams</th>
            <th>result</th>
          </tr>
        </thead>
        <tbody>
          {games?.map((game) => (
            <tr key={game.gameId}>
              <td>{formatGameTime(game.time)}</td>
              <td style={{ textAlign: "right" }}>
                {`${game.homeTeamName} `}
                {isSmallScreen && (
                  <Image
                    alt={`${game.homeTeamName} logo`}
                    src={`/img/${game.homeTeamCode}-30.png`}
                    width="15"
                    height="15"
                  />
                )}
              </td>
              <td>&nbsp;-&nbsp;</td>
              <td style={{ textAlign: "left" }}>
                {isSmallScreen && (
                  <Image
                    alt={`${game.awayTeamName} logo`}
                    src={`/img/${game.awayTeamCode}-30.png`}
                    width="15"
                    height="15"
                  />
                )}
                {` ${game.awayTeamName}`}
              </td>
              <td>{game.result}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
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
    revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
    props: {
      games: data.games,
    },
  };
}

export default Games;
