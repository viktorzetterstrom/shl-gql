import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Player {
  @Field()
  playerId!: string;

  @Field()
  teamCode!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  position!: string;

  @Field()
  birthDate!: string;

  @Field()
  nationality!: string;

  @Field()
  number!: number;

  @Field()
  height!: number;

  @Field()
  weight!: number;

  @Field()
  gamesPlayed!: number;

  @Field({ description: "Player rank for requested season and sortOrder" })
  rank!: number;

  @Field({
    description:
      "True if the number of games is enough for the statistics to be correctly calculated",
  })
  validRanking!: boolean;
}

@ObjectType()
export class Goalie extends Player {
  @Field()
  gamesPlayedOnIce!: number;

  @Field()
  goalsAgainst!: number;

  @Field()
  goalsAgainstAverage!: number;

  @Field()
  gamesStarted!: number;

  @Field()
  minutesInPlay!: string;

  @Field()
  shutOuts!: number;

  @Field()
  shotsOnGoal!: number;

  @Field()
  saves!: number;

  @Field()
  savesPercentage!: number;

  @Field()
  wins!: number;

  @Field()
  ties!: number;

  @Field()
  losses!: number;
}

@ObjectType()
export class Skater extends Player {
  @Field()
  totalOnIceSeconds!: number;

  @Field()
  totalOnIce!: string;

  @Field()
  assists!: number;

  @Field()
  blockedShots!: number;

  @Field()
  goals!: number;

  @Field()
  gameWinningGoals!: number;

  @Field()
  hits!: number;

  @Field()
  minus!: number;

  @Field()
  penaltyMinutes!: number;

  @Field()
  powerPlayGoals!: number;

  @Field()
  plus!: number;

  @Field()
  plusMinus!: number;

  @Field()
  shotsOnGoal!: number;

  @Field()
  totalPoints!: number;
}
