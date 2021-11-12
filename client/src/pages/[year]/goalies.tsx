import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
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
            <th>name</th>
            <th>gp</th>
            <th>so</th>
            <th>gaa</th>
            <th>sv%</th>
          </tr>
        </thead>
        <tbody>
          {goalies?.map((goalie) => (
            <tr key={goalie.playerId}>
              <td>
                <Image
                  alt={`${goalie.teamCode} logo`}
                  src={`/img/${goalie.teamCode}-30.png`}
                  width="15"
                  height="15"
                />
                {` ${goalie.firstName.toLowerCase()} ${goalie.lastName.toLowerCase()}`}
              </td>
              <td>{goalie.gamesPlayedOnIce}</td>
              <td>{goalie.shutOuts}</td>
              <td>{goalie.goalsAgainstAverage.toFixed(2)}</td>
              <td>{`${goalie.savesPercentage.toFixed(1)}%`}</td>
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
