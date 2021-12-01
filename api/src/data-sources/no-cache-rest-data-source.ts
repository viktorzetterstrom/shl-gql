import { RESTDataSource } from "apollo-datasource-rest";

export class NoCacheRESTDataSource extends RESTDataSource {
  deleteCacheForRequest(request: Request) {
    this.memoizedResults.delete(this.cacheKeyFor(request));
  }

  didReceiveResponse(response: Response, request: Request) {
    this.deleteCacheForRequest(request);
    return super.didReceiveResponse(response, request);
  }

  didEncounterError(error: Error, request: Request) {
    this.deleteCacheForRequest(request);
    return super.didEncounterError(error, request);
  }
}
