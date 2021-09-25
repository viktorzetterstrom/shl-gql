import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Team {
  @Field()
  teamCode!: string;

  @Field()
  golds!: string;

  @Field()
  finals!: string;

  @Field()
  founded!: string;

  @Field({ nullable: true })
  holyNumbers?: string;
}
