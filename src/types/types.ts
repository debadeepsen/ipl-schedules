export type MatchData = {
  MatchNumber: number;
  RoundNumber: number;
  DateUtc: string;
  Location: string;
  HomeTeam: string;
  AwayTeam: string;
  Group: any;
  HomeTeamScore: any;
  AwayTeamScore: any;
};

export type Response = {
  data: MatchData[];
  teams: string[];
};
