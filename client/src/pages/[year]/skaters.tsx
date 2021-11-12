import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { client } from "../../graphql/apollo-client";
import { SkatersDocument, SkatersQuery } from "../../generated/graphql";
import { STATIC_PAGE_REVALIDATE_SECONDS } from "../../config/static-page-revalidate-seconds";
import { ACTIVE_SEASON } from "../../config/active-season";
import { StyledTable } from "../../components/styled-table";

interface SkatersProps {
  skaters: SkatersQuery["skaters"];
}

const Skaters: NextPage<SkatersProps> = ({ skaters }) => {
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>name</th>
            <th>gp</th>
            <th>+/-</th>
            <th>a</th>
            <th>g</th>
            <th>p</th>
          </tr>
        </thead>
        <tbody>
          {skaters?.map((skater) => (
            <tr key={skater.playerId}>
              <td>
                <Image
                  alt={`${skater.teamCode} logo`}
                  src={`/img/${skater.teamCode}-30.png`}
                  width="15"
                  height="15"
                />
                {` ${skater.firstName.toLowerCase()} ${skater.lastName.toLowerCase()}`}
              </td>
              <td>{skater.gamesPlayed}</td>
              <td>{skater.plusMinus}</td>
              <td>{skater.assists}</td>
              <td>{skater.goals}</td>
              <td>{skater.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
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
