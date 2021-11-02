import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "../../graphql/apollo-client";
import { GoaliesDocument, Goalie, GoaliesQuery } from "../../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../../config/active-season";

interface GoaliesProps {
  goalies: GoaliesQuery["goalies"];
}

const Goalies: NextPage<GoaliesProps> = ({ goalies }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Goals Against</th>
          </tr>
        </thead>
        <tbody>
          {goalies?.map((goalie) => (
            <tr key={goalie.playerId}>
              <td>{goalie.firstName}</td>
              <td>{goalie.lastName}</td>
              <td>{goalie.goalsAgainst}</td>
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
  const { data } = await client.query<GoaliesQuery>({
    query: GoaliesDocument,
    variables: {
      input: {
        year: params?.year,
      },
    },
  });

  return {
    props: {
      revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
      goalies: data.goalies,
    },
  };
};

export default Goalies;