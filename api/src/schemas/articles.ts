import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Article {
  @Field()
  articleId!: string;
}
