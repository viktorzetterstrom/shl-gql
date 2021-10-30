import type { NextPage } from "next";
import { client } from "../graphql/apollo-client";
import {
  StandingsDocument,
  StandingsEntry,
  StandingsQuery,
} from "../generated/graphql";

interface StandingsProps {
  standings: StandingsQuery["standings"];
}

const Standings: NextPage<StandingsProps> = ({ standings }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>team</th>
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
              <td>{entry.teamCode}</td>
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
      </table>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<StandingsQuery>({
    query: StandingsDocument,
    variables: {
      input: {
        year: "2021",
      },
    },
  });

  return {
    props: {
      standings: data.standings,
    },
  };
}

export default Standings;
