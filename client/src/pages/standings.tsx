import type { NextPage } from "next";
import { client } from "../graphql/apollo-client";
import {
  StandingsDocument,
  StandingsEntry,
  StandingsQuery,
} from "../generated/graphql";

interface StandingsProps {
  standings: StandingsEntry[];
}

const Standings: NextPage<StandingsProps> = ({ standings }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>3p</th>
            <th>2p</th>
            <th>1p</th>
            <th>0p</th>
            <th>G</th>
            <th>GA</th>
            <th>+/-</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((entry) => (
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
  const { data, error } = await client.query<StandingsQuery>({
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
