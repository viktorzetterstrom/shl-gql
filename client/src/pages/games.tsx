import type { NextPage } from "next";
import { sub as subtractFromDate, add as addToDate } from "date-fns";
import Image from "next/image";
import { client } from "../graphql/apollo-client";
import { GameDaysDocument, GameDaysQuery } from "../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../config/static-page-revalidate-seconds";
import { StyledTable } from "../components/styled-table";
import React from "react";

interface GamesProps {
  gameDays: GameDaysQuery["gameDays"];
}

const Games: NextPage<GamesProps> = ({ gameDays }) => {
  return (
    <div>
      <StyledTable>
        <tbody>
          {gameDays
            ?.filter((gameDay) => {
              const twoWeeksAgo = subtractFromDate(new Date(), { weeks: 2 });
              const twoWeeksFromNow = addToDate(new Date(), { weeks: 2 });
              const gameDate = new Date(gameDay.date);

              return twoWeeksAgo < gameDate && gameDate < twoWeeksFromNow;
            })
            .map(({ date, games }) => (
              <React.Fragment key={date}>
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {date}
                  </td>
                </tr>
                {games?.map((game) => (
                  <tr key={game.gameId}>
                    <td>{game.time}</td>
                    <td style={{ textAlign: "right" }}>
                      {`${game.homeTeamName} `}
                      <Image
                        alt={`${game.homeTeamName} logo`}
                        src={`/img/${game.homeTeamCode}-30.png`}
                        width="15"
                        height="15"
                      />
                    </td>
                    <td>&nbsp;-&nbsp;</td>
                    <td style={{ textAlign: "left" }}>
                      <Image
                        alt={`${game.awayTeamName} logo`}
                        src={`/img/${game.awayTeamCode}-30.png`}
                        width="15"
                        height="15"
                      />
                      {` ${game.awayTeamName}`}
                    </td>
                    <td>{game.result}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} />
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<GameDaysQuery>({
    query: GameDaysDocument,
    variables: {
      input: {
        year: "2021",
      },
    },
  });

  return {
    revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
    props: {
      gameDays: data.gameDays,
    },
  };
}

export default Games;
