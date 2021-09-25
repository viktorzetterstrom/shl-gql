import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Player {
  @Field()
  playerId!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;
}

@ObjectType()
export class Goalie extends Player {
  @Field()
  goalsAgainst!: number;
}

@ObjectType()
export class Skater extends Player {
  @Field()
  goals!: number;
}
