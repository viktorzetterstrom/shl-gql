import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "../../graphql/apollo-client";
import { Team, TeamsDocument, TeamsQuery } from "../../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../../config/active-season";

interface TeamsProps {
  teams: Team[];
}

const Teams: NextPage<TeamsProps> = ({ teams }) => {
  return <div>{JSON.stringify(teams)}</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { year: ACTIVE_SEASON } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<TeamsQuery>({
    query: TeamsDocument,
  });

  return {
    props: {
      revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
      teams: data.teams,
    },
  };
};

export default Teams;
