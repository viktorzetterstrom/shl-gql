import axios from "axios";
import {
  HTTPCache,
  RequestOptions,
  RESTDataSource,
} from "apollo-datasource-rest";

type ApiResponse = any;
interface Season {
  games: () => Promise<ApiResponse>;
  game: (gameId: string) => Promise<ApiResponse>;
  statistics: {
    goalkeepers: () => Promise<ApiResponse>;
    skaters: () => Promise<ApiResponse>;
    teams: {
      standings: () => Promise<ApiResponse>;
    };
  };
}

export class Shl extends RESTDataSource {
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
        goalkeepers: () =>
          this.get(`${base}/statistics/goalkeepers?sort=savesPercent`),
        skaters: () => this.get(`${base}/statistics/players?sort=points`),
        teams: {
          standings: () => this.get(`${base}/statistics/teams/standings`),
        },
      },
    };
  }

  teams(): Promise<ApiResponse> {
    return this.get("/teams");
  }

  team(teamCode: string): Promise<ApiResponse> {
    return this.get(`/teams/${teamCode}`);
  }

  videos(): Promise<ApiResponse> {
    return this.get("/videos");
  }

  articles(): Promise<ApiResponse> {
    return this.get("articles");
  }
}
