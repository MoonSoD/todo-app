/**
 * @template TModel
 * @template TRelationEndpoint
 */
import { AppendReadonly, RelationFetcher } from "./index";
import { Fetcher } from "./base.fetcher";

export abstract class O2MRelationFetcher<
    TModel,
    TRelationEndpoint,
    TRelationModel,
  >
  extends Fetcher<TModel>
  implements RelationFetcher<TRelationEndpoint>
{
  public constructor(protected endpoint = "") {
    super(endpoint);
  }

  public getOneWith(
    id: string,
    relationEndpoint: TRelationEndpoint,
  ): Promise<AppendReadonly<TRelationModel[]>> {
    return Fetcher.extractData<AppendReadonly<TRelationModel[]>>(
      this.api.get(`${this.endpoint}/${id}/${relationEndpoint}`),
    );
  }
}
