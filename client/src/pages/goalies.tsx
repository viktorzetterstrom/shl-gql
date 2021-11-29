import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "../graphql/apollo-client";
import { GoaliesDocument, GoaliesQuery } from "../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../config/active-season";
import { StyledTable } from "../components/styled-table";
import { TeamLogo } from "../components";

interface GoaliesProps {
  goalies: GoaliesQuery["goalies"];
}

const Goalies: NextPage<GoaliesProps> = ({ goalies }) => {
  return (
    <div>
      <StyledTable>
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
                <TeamLogo teamCode={goalie.teamCode} />
                {` ${goalie.firstName.toLowerCase()} ${goalie.lastName.toLowerCase()}`}
              </td>
              <td>{goalie.gamesPlayedOnIce}</td>
              <td>{goalie.shutOuts}</td>
              <td>{goalie.goalsAgainstAverage.toFixed(2)}</td>
              <td>{`${goalie.savesPercentage.toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const goaliesQuery = client.query<GoaliesQuery>({
    query: GoaliesDocument,
    variables: {
      input: {
        year: ACTIVE_SEASON,
      },
    },
  });

  return {
    revalidate: STATIC_PAGE_REVALIDATE_SECONDS,
    props: {
      goalies: (await goaliesQuery).data.goalies,
    },
  };
};

export default Goalies;
