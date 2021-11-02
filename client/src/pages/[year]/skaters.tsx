import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "../../graphql/apollo-client";
import { SkatersDocument, Skater, SkatersQuery } from "../../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../../config/active-season";

interface SkatersProps {
  skaters: SkatersQuery["skaters"];
}

const Skaters: NextPage<SkatersProps> = ({ skaters }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {skaters?.map((skater) => (
            <tr key={skater.playerId}>
              <td>{skater.firstName}</td>
              <td>{skater.lastName}</td>
              <td>{skater.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { year: ACTIVE_SEASON } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<SkatersQuery>({
    query: SkatersDocument,
    variables: {
      input: {
        year: params?.year,
      },
    },
  });

  return {
    props: {
      revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
      skaters: data.skaters,
    },
  };
};

export default Skaters;
