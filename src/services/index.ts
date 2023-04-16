import { FetcherFilterCriteria } from "@services/abstract";

export interface FilterVars<T> {
  filter: FetcherFilterCriteria<T> | undefined;
}

export interface FindVars {
  id: string;
}

export interface FindFilterVars<T> extends FilterVars<T>, FindVars {}

export { Fetcher } from "./abstract/base.fetcher";
export { O2MRelationFetcher } from "./abstract/o2m-relation.fetcher";
