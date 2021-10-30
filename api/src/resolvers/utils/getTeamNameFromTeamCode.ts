const teams = {
  LHF: "Luleå",
  FHC: "Frölunda",
  DIF: "Djurgården",
  BIF: "Brynäs",
  FBK: "Färjestad",
  HV71: "HV71",
  LHC: "Linköping",
  MIF: "Malmö",
  OHK: "Örebro",
  RBK: "Rögle",
  SAIK: "Skellefteå",
  VLH: "Växjö",
  LIF: "Leksand",
  IKO: "Oskarshamn",
  TIK: "Timrå",
};

export type TeamCode = keyof typeof teams;

export const getTeamNameFromTeamCode = (teamCode: TeamCode): string =>
  teams[teamCode];
