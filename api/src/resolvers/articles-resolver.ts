import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { Context } from "..";
import { ArticlesApiResponse } from "../data-sources";
import { Article, TeamInput } from "../schemas";

const formatArticlesApiResponse = (response: ArticlesApiResponse): Article[] =>
  response.map((article) => ({
    articleId: article.article_id,
  }));

@Resolver(() => Article)
export class ArticlesResolver {
  @Query(() => [Article], { nullable: true })
  async articles(
    @Arg("input", { nullable: true }) input: TeamInput,
    @Ctx() context: Context
  ): Promise<Article[]> {
    const response = await context.dataSources.shl.articles(input?.teamCode);

    return formatArticlesApiResponse(response);
  }
}
