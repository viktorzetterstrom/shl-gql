import type { GetStaticProps, NextPage } from "next";
import { add as addToDate } from "date-fns";
import { client } from "../graphql/apollo-client";
import { GameDaysDocument, GameDaysQuery } from "../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../config/static-page-revalidate-seconds";
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
              const now = new Date();
              const twoWeeksFromNow = addToDate(new Date(), { weeks: 2 });
              const gameDate = new Date(gameDay.date);

              return now < gameDate && gameDate < twoWeeksFromNow;
            })
            .map((gameDay) => (
              <GameDay key={gameDay.date} gameDay={gameDay} />
            ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<GameDaysQuery>({
    query: GameDaysDocument,
    variables: {
      input: {
        year: ACTIVE_SEASON,
      },
    },
  });

  return {
    revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
    props: {
      gameDays: data.gameDays,
    },
  };
};

export default Games;
