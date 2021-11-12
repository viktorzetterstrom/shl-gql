import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { client } from "../graphql/apollo-client";
import { StandingsDocument, StandingsQuery } from "../generated/graphql";
import { StyledTable } from "../components/styled-table";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../config/active-season";

interface StandingsProps {
  standings: StandingsQuery["standings"];
}

const Standings: NextPage<StandingsProps> = ({ standings }) => (
  <div>
    <StyledTable>
      <thead>
        <tr>
          <th>team</th>
          <th>gp</th>
          <th>3p</th>
          <th>2p</th>
          <th>1p</th>
          <th>0p</th>
          <th>g</th>
          <th>ga</th>
          <th>+/-</th>
          <th>points</th>
        </tr>
      </thead>
      <tbody>
        {standings?.map((entry) => (
          <tr key={entry.teamCode}>
            <td>
              <Image
                alt={`${entry.teamName} logo`}
                src={`/img/${entry.teamId}-30.png`}
                width="15"
                height="15"
              />{" "}
              {entry.teamName.toLowerCase()}
            </td>
            <td>{entry.gamesPlayed}</td>
            <td>{entry.threePoints}</td>
            <td>{entry.twoPoints}</td>
            <td>{entry.onePoints}</td>
            <td>{entry.zeroPoints}</td>
            <td>{entry.goals}</td>
            <td>{entry.goalsAgainst}</td>
            <td>{entry.plusMinus}</td>
            <td>{entry.points}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<StandingsQuery>({
    query: StandingsDocument,
    variables: {
      input: {
        year: ACTIVE_SEASON,
      },
    },
  });

  return {
    props: {
      revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
      standings: data.standings,
    },
  };
};

export default Standings;
