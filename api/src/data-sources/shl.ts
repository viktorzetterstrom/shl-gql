import axios from "axios";
import { HTTPCache, RequestOptions } from "apollo-datasource-rest";
import {
  ArticlesApiResponse,
  GameApiResponse,
  GamesApiResponse,
  GoalieApiResponse,
  SkaterApiResponse,
  StandingsApiResponse,
  TeamApiResponse,
  TeamsApiResponse,
  VideosApiResponse,
} from "./shl-types";
import { GoaliesSortOrder, SkatersSortOrder } from "../schemas";
import { NoCacheRESTDataSource } from "./no-cache-rest-data-source";

interface Season {
  games: () => Promise<GamesApiResponse>;
  game: (gameId: string) => Promise<GameApiResponse>;
  statistics: {
    goalies: (sortOrder?: GoaliesSortOrder) => Promise<GoalieApiResponse>;
    skaters: (sortOrder?: SkatersSortOrder) => Promise<SkaterApiResponse>;
    teams: {
      standings: () => Promise<StandingsApiResponse>;
    };
  };
}

export class Shl extends NoCacheRESTDataSource {
  private accessToken: string | undefined;
  private expires: Date = new Date();

  constructor(private id: string, private secret: string) {
    super();
    this.baseURL = "https://openapi.shl.se/";
    this.httpCache = new HTTPCache();
  }

  private async connect(): Promise<void> {
    // Using axios instead of member methods to avoid recursive loop through
    // willSendRequest function
    const res = await axios.post(
      this.baseURL + "oauth2/token",
      new URLSearchParams({
        client_id: this.id,
        client_secret: this.secret,
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    this.accessToken = res.data.access_token;
    this.expires = new Date();
    this.expires.setSeconds(this.expires.getSeconds() + res.data.expires_in);
  }

  protected async willSendRequest(request: RequestOptions): Promise<void> {
    if (new Date() > this.expires) await this.connect();

    request.headers.set("authorization", `Bearer ${this.accessToken}`);
  }

  season(year: string): Season {
    const base = `/seasons/${year}`;
    return {
      games: () => this.get(`${base}/games`),
      game: (gameId: string) => this.get(`${base}/games/${gameId}`),
      statistics: {
        goalies: (sortOrder) =>
          this.get(
            `${base}/statistics/goalkeepers`,
            sortOrder ? { sort: sortOrder } : undefined
          ),
        skaters: (sortOrder) =>
          this.get(
            `${base}/statistics/players`,
            sortOrder ? { sort: sortOrder } : undefined
          ),
        teams: {
          standings: () => this.get(`${base}/statistics/teams/standings`),
        },
      },
    };
  }

  teams(): Promise<TeamsApiResponse> {
    return this.get("/teams");
  }

  team(teamCode: string): Promise<TeamApiResponse> {
    return this.get(`/teams/${teamCode}`);
  }

  videos(teamCode?: string): Promise<VideosApiResponse> {
    return this.get(
      "/videos",
      teamCode ? { "teamIds[]": teamCode } : undefined
    );
  }

  articles(teamCode?: string): Promise<ArticlesApiResponse> {
    return this.get(
      "/articles",
      teamCode ? { "teamIds[]": teamCode } : undefined
    );
  }
}
