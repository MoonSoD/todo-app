/**
 * @template TModel
 * @template TRelationEndpoint
 */
import { AppendReadonly, FetcherFilterCriteria } from "./index";
import { Fetcher } from "./base.fetcher";

export abstract class O2MRelationFetcher<
  TModel,
  TRelationEndpoint,
  TRelationModel,
> extends Fetcher<TModel> {
  public constructor(protected endpoint = "") {
    super(endpoint);
  }

  public getOneWith(
    id: string,
    relationEndpoint: TRelationEndpoint,
    filter?: FetcherFilterCriteria<TRelationModel>,
  ): Promise<AppendReadonly<TRelationModel[]>> {
    return Fetcher.extractData<AppendReadonly<TRelationModel[]>>(
      this.api.get(
        `${this.endpoint}/${id}/${relationEndpoint}?${Fetcher.toQueryString(
          filter,
        )}`,
      ),
    );
  }

  public deleteOneWith(
    id: string,
    relationEndpoint: TRelationEndpoint,
    relationId: string,
  ): Promise<TRelationModel> {
    return Fetcher.extractData<TRelationModel>(
      this.api.delete(
        `${this.endpoint}/${id}/${relationEndpoint}/${relationId}`,
      ),
    );
  }

  public updateOneWith(
    id: string,
    relationEndpoint: TRelationEndpoint,
    relationId: string,
    data: Partial<TRelationModel>,
  ): Promise<TRelationModel> {
    return Fetcher.extractData<TRelationModel>(
      this.api.put(
        `${this.endpoint}/${id}/${relationEndpoint}/${relationId}`,
        data,
      ),
    );
  }

  public createOneWith(
    id: string,
    relationEndpoint: TRelationEndpoint,
    data: Partial<TRelationModel>,
  ): Promise<TRelationModel> {
    return Fetcher.extractData<TRelationModel>(
      this.api.post(`${this.endpoint}/${id}/${relationEndpoint}`, data),
    );
  }
}
