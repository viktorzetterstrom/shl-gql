import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  articleId: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  gameId: Scalars['String'];
};

export type GameInput = {
  gameId: Scalars['String'];
  year: Scalars['String'];
};

export type Goalie = {
  __typename?: 'Goalie';
  firstName: Scalars['String'];
  goalsAgainst: Scalars['Float'];
  lastName: Scalars['String'];
  playerId: Scalars['String'];
};

export type GoaliesInput = {
  sortOrder?: Maybe<GoaliesSortOrder>;
  year: Scalars['String'];
};

export enum GoaliesSortOrder {
  GoalsAgainst = 'GoalsAgainst',
  GoalsAgainstAverage = 'GoalsAgainstAverage',
  Lost = 'Lost',
  MinutesInPlay = 'MinutesInPlay',
  Saves = 'Saves',
  SavesPercent = 'SavesPercent',
  ShooutOuts = 'ShooutOuts',
  Tied = 'Tied',
  Won = 'Won'
}

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  game?: Maybe<Game>;
  games: Array<Game>;
  goalies?: Maybe<Array<Goalie>>;
  skaters?: Maybe<Array<Skater>>;
  standings?: Maybe<Array<StandingsEntry>>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  videos: Array<Video>;
};


export type QueryArticlesArgs = {
  input?: Maybe<TeamInput>;
};


export type QueryGameArgs = {
  input: GameInput;
};


export type QueryGamesArgs = {
  input: StatisticsInput;
};


export type QueryGoaliesArgs = {
  input: GoaliesInput;
};


export type QuerySkatersArgs = {
  input: SkatersInput;
};


export type QueryStandingsArgs = {
  input: StatisticsInput;
};


export type QueryTeamArgs = {
  input: TeamInput;
};


export type QueryVideosArgs = {
  input?: Maybe<TeamInput>;
};

export type Skater = {
  __typename?: 'Skater';
  firstName: Scalars['String'];
  goals: Scalars['Float'];
  lastName: Scalars['String'];
  playerId: Scalars['String'];
};

export type SkatersInput = {
  sortOrder?: Maybe<SkatersSortOrder>;
  year: Scalars['String'];
};

export enum SkatersSortOrder {
  Assists = 'Assists',
  Goals = 'Goals',
  Hits = 'Hits',
  PenaltyMinutes = 'PenaltyMinutes',
  PlusMinus = 'PlusMinus',
  Points = 'Points'
}

export type StandingsEntry = {
  __typename?: 'StandingsEntry';
  goals: Scalars['Float'];
  goalsAgainst: Scalars['Float'];
  onePoints: Scalars['Float'];
  plusMinus: Scalars['Float'];
  points: Scalars['Float'];
  rank: Scalars['Float'];
  teamCode: Scalars['String'];
  threePoints: Scalars['Float'];
  twoPoints: Scalars['Float'];
  zeroPoints: Scalars['Float'];
};

export type StatisticsInput = {
  year: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  finals: Scalars['String'];
  founded: Scalars['String'];
  golds: Scalars['String'];
  holyNumbers?: Maybe<Scalars['String']>;
  teamCode: Scalars['String'];
};

export type TeamInput = {
  teamCode: Scalars['String'];
};

export type Video = {
  __typename?: 'Video';
  videoId: Scalars['String'];
};

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', teamCode: string, golds: string, finals: string, founded: string, holyNumbers?: Maybe<string> }> };

export type StandingsQueryVariables = Exact<{
  input: StatisticsInput;
}>;


export type StandingsQuery = { __typename?: 'Query', standings?: Maybe<Array<{ __typename?: 'StandingsEntry', teamCode: string, goals: number, goalsAgainst: number, onePoints: number, plusMinus: number, rank: number, threePoints: number, twoPoints: number, zeroPoints: number, points: number }>> };


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
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const StandingsDocument = gql`
    query Standings($input: StatisticsInput!) {
  standings(input: $input) {
    teamCode
    goals
    goalsAgainst
    onePoints
    plusMinus
    rank
    threePoints
    twoPoints
    zeroPoints
    points
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
export function useStandingsQuery(baseOptions: Apollo.QueryHookOptions<StandingsQuery, StandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StandingsQuery, StandingsQueryVariables>(StandingsDocument, options);
      }
export function useStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StandingsQuery, StandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StandingsQuery, StandingsQueryVariables>(StandingsDocument, options);
        }
export type StandingsQueryHookResult = ReturnType<typeof useStandingsQuery>;
export type StandingsLazyQueryHookResult = ReturnType<typeof useStandingsLazyQuery>;
export type StandingsQueryResult = Apollo.QueryResult<StandingsQuery, StandingsQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    