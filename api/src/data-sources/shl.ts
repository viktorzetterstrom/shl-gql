import axios from "axios";
import {
  HTTPCache,
  RequestOptions,
  RESTDataSource,
} from "apollo-datasource-rest";

type ApiResponse = any;

interface ApiTeamPlayer {
  player_id: string;
  assistant: boolean;
  captain: boolean;
  date_of_birth: string;
  default_jersey: number;
  first_name: string;
  height: number;
  last_name: string;
  nationality: string;
  player_url_desktop: string;
  player_url_mobile: string;
  position: string;
  shoots: string;
  shoots_right: boolean;
  weight: number;
}

interface ApiTeamStaffMember {
  first_name: string;
  last_name: string;
  nationality: string;
}

interface ApiTeamFacts {
  team_code: string;
  accreditation: { contact_information: string };
  contact: {
    address: string;
    email: string;
    phone: string;
  };
  finals: string;
  founded: string;
  golds: string;
  holy: string;
  chairman: string;
  president: string;
}

interface ApiStandingsEntry {
  team_code: string;
  gp: number;
  rank: number;
  team: {
    code: string;
    id: string;
  };
  diff: number;
  g: number;
  ga: number;
  non_reg_l: number;
  non_reg_non_w: number;
  non_reg_t: number;
  non_reg_w: number;
  otl: number;
  ott: number;
  otw: number;
  points: number;
  reg_l: number;
  reg_t: number;
  reg_w: number;
  sol: number;
  sow: number;
}

interface ApiPlayerStatistics {
  player_id: string;
  gp: number;
  rank: number;
  info: {
    birthdate: string;
    first_name: string;
    height: number;
    last_name: string;
    nationality: string;
    number: number;
    player_id: number;
    team: {
      code: string;
      id: string;
    };
    team_code: string;
    teams: string[];
    weight: number;
  };
}

interface ApiGoalieStatistics extends ApiPlayerStatistics {
  ga: number;
  gaa: number;
  gs: number;
  l: number;
  mip: string;
  so: number;
  soga: number;
  svs: number;
  svsperc: number;
  t: number;
  valid_ranking: boolean;
  w: string;
}

interface ApiSkaterStatistics extends ApiPlayerStatistics {
  toi: number;
  toi_gp: string;
  a: number;
  bk_s: number;
  g: number;
  gwg: number;
  hits: number;
  minus: number;
  pim: number;
  ppg: number;
  plus: number;
  plus_minus: number;
  sog: number;
  tp: number;
}

export interface TeamApiResponse {
  facts: ApiTeamFacts;
  players: ApiTeamPlayer[];
  staff: ApiTeamStaffMember[];
}
export type TeamsApiResponse = ApiTeamFacts[];
export type GoalieApiResponse = ApiGoalieStatistics[];
export type StandingsApiResponse = ApiStandingsEntry[];
export type SkaterApiResponse = ApiSkaterStatistics[];

interface Season {
  games: () => Promise<ApiResponse>;
  game: (gameId: string) => Promise<ApiResponse>;
  statistics: {
    goalies: () => Promise<GoalieApiResponse>;
    skaters: () => Promise<SkaterApiResponse>;
    teams: {
      standings: () => Promise<StandingsApiResponse>;
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
        goalies: () =>
          this.get(`${base}/statistics/goalkeepers?sort=savesPercent`),
        skaters: () => this.get(`${base}/statistics/players?sort=points`),
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

  videos(): Promise<ApiResponse> {
    return this.get("/videos");
  }

  articles(): Promise<ApiResponse> {
    return this.get("articles");
  }
}
