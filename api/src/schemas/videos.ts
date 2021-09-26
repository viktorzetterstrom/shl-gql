import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Video {
  @Field()
  videoId!: string;
}
