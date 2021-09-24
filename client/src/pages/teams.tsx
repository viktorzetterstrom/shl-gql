import type { NextPage } from "next";
import { client } from "../graphql/apollo-client";
import { Team, TeamsDocument, TeamsQuery } from "../generated/graphql";

interface TeamsProps {
  teams: Team[];
}

const Teams: NextPage<TeamsProps> = ({ teams }) => {
  return <div>{JSON.stringify(teams)}</div>;
};

export async function getStaticProps() {
  const { data } = await client.query<TeamsQuery>({
    query: TeamsDocument,
  });

  return {
    props: {
      teams: data.teams,
    },
  };
}

export default Teams;
