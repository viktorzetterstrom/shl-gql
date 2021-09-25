import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Goalie = {
  __typename?: "Goalie";
  firstName: Scalars["String"];
  goalsAgainst: Scalars["Float"];
  lastName: Scalars["String"];
  playerId: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  goalies?: Maybe<Array<Goalie>>;
  skaters?: Maybe<Array<Skater>>;
  standings?: Maybe<Array<StandingsEntry>>;
  team?: Maybe<Team>;
  teams: Array<Team>;
};

export type QueryGoaliesArgs = {
  input: StatisticsInput;
};

export type QuerySkatersArgs = {
  input: StatisticsInput;
};

export type QueryStandingsArgs = {
  input: StatisticsInput;
};

export type QueryTeamArgs = {
  input: TeamInput;
};

export type Skater = {
  __typename?: "Skater";
  firstName: Scalars["String"];
  goals: Scalars["Float"];
  lastName: Scalars["String"];
  playerId: Scalars["String"];
};

export type StandingsEntry = {
  __typename?: "StandingsEntry";
  teamCode: Scalars["String"];
};

export type StatisticsInput = {
  year: Scalars["String"];
};

export type Team = {
  __typename?: "Team";
  finals: Scalars["String"];
  founded: Scalars["String"];
  golds: Scalars["String"];
  holyNumbers?: Maybe<Scalars["String"]>;
  teamCode: Scalars["String"];
};

export type TeamInput = {
  teamCode: Scalars["String"];
};

export type TeamsQueryVariables = Exact<{ [key: string]: never }>;

export type TeamsQuery = {
  __typename?: "Query";
  teams: Array<{
    __typename?: "Team";
    teamCode: string;
    golds: string;
    finals: string;
    founded: string;
    holyNumbers?: Maybe<string>;
  }>;
};

export type StandingsQueryVariables = Exact<{
  input: StatisticsInput;
}>;

export type StandingsQuery = {
  __typename?: "Query";
  standings?: Maybe<Array<{ __typename?: "StandingsEntry"; teamCode: string }>>;
};

export const TeamsDocument = gql`
  query Teams {
    teams {
      teamCode
      golds
      finals
      founded
      holyNumbers
    }
  }
`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(
    TeamsDocument,
    options
  );
}
export function useTeamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(
    TeamsDocument,
    options
  );
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<
  TeamsQuery,
  TeamsQueryVariables
>;
export const StandingsDocument = gql`
  query Standings($input: StatisticsInput!) {
    standings(input: $input) {
      teamCode
    }
  }
`;

/**
 * __useStandingsQuery__
 *
 * To run a query within a React component, call `useStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStandingsQuery(
  baseOptions: Apollo.QueryHookOptions<StandingsQuery, StandingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StandingsQuery, StandingsQueryVariables>(
    StandingsDocument,
    options
  );
}
export function useStandingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StandingsQuery,
    StandingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StandingsQuery, StandingsQueryVariables>(
    StandingsDocument,
    options
  );
}
export type StandingsQueryHookResult = ReturnType<typeof useStandingsQuery>;
export type StandingsLazyQueryHookResult = ReturnType<
  typeof useStandingsLazyQuery
>;
export type StandingsQueryResult = Apollo.QueryResult<
  StandingsQuery,
  StandingsQueryVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
