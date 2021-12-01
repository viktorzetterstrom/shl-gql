import type { GetStaticProps, NextPage } from "next";
import { sub as subFromDate } from "date-fns";
import { client } from "../graphql/apollo-client";
import { GameDaysDocument, GameDaysQuery } from "../generated/graphql";
import { StyledTable } from "../components/styled-table";
import React from "react";
import { ACTIVE_SEASON } from "../config/active-season";
import { GameDay } from "../components";

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
              const gameDate = new Date(gameDay.date);

              // Subtract one day to now show results of todays games, which might not have started
              const yesterday = subFromDate(new Date(), { days: 1 });

              return gameDate < yesterday;
            })
            .map((gameDay) => (
              <GameDay key={gameDay.date} gameDay={gameDay} />
            ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const gameDaysQuery = client.query<GameDaysQuery>({
    query: GameDaysDocument,
    variables: {
      input: {
        year: ACTIVE_SEASON,
      },
    },
  });

  return {
    revalidate: 60,
    props: {
      gameDays: (await gameDaysQuery).data.gameDays,
    },
  };
};

export default Games;
