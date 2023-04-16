export type AppendReadonly<T> = T & { readonly id: string };

type SortType = "sortby" | "orderby" | "order";

export type FetcherFilterCriteria<TModel> = [keyof TModel | SortType, string][];

export interface RelationFetcher<TRelationEndpoint> {
  getOneWith(id: string, relationEndpoint: TRelationEndpoint);
}

export { Fetcher } from "./base.fetcher";
export { O2MRelationFetcher } from "./o2m-relation.fetcher";
