import { TeamCode } from "../resolvers/utils/getTeamNameFromTeamCode";

interface ApiArticle {
  article_id: string;
  article_url: string;
  author: {
    email: string;
    name: string;
    title: string;
  };
  publish_date: string;
  team_code: string;
  title: string;
}
interface ApiGame {
  game_id: number;
  away_team_code: string;
  away_team_result: number;
  game_center_active: boolean;
  game_center_url_desktop: string;
  game_center_url_mobile: string;
  game_type: string;
  game_uuid: string;
  highlights_coverage_enabled: number;
  home_team_code: string;
  home_team_result: number;
  live_coverage_enabled: number;
  overtime: number;
  penalty_shots: number;
  played: number;
  season: string;
  series: string;
  start_date_time: string;
  ticket_url: string;
  tv_channels: string[];
  venue: string;
}

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
  team_code: TeamCode;
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
    position: string;
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
  gpi: number;
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
  w: number;
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

interface ApiVideo {
  video_id: number;
  length: number;
  name: string;
  team_code: string;
  short_description: string;
  publish_date: string;
  video_playback_url: string;
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
export type GamesApiResponse = ApiGame[];
export type GameApiResponse = ApiGame;
export type VideosApiResponse = ApiVideo[];
export type ArticlesApiResponse = ApiArticle[];
