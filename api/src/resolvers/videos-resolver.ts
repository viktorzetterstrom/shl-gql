import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { Context } from "..";
import { VideosApiResponse } from "../data-sources";
import { Video, TeamInput } from "../schemas";

const formatVideosApiResponse = (response: VideosApiResponse): Video[] =>
  response.map((video) => ({
    videoId: String(video.video_id),
  }));

@Resolver(() => Video)
export class VideosResolver {
  @Query(() => [Video])
  async videos(
    @Arg("input", { nullable: true }) input: TeamInput,
    @Ctx() context: Context
  ): Promise<Video[]> {
    const response = await context.dataSources.shl.videos(input?.teamCode);

    return formatVideosApiResponse(response);
  }
}
