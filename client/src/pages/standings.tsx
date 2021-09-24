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
  return <div>{JSON.stringify(standings)}</div>;
};

export async function getStaticProps() {
  const { data, error } = await client.query<StandingsQuery>({
    query: StandingsDocument,
    variables: {
      input: {
        year: "2019",
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
