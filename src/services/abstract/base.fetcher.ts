import todoHttp from "../../lib/todo-http";
import { AxiosResponse } from "axios";
import { FetcherFilterCriteria } from "./index";

export abstract class Fetcher<TModel> {
  public constructor(protected endpoint = "", protected api = todoHttp) {}

  static async extractData<T>(response: Promise<AxiosResponse>): Promise<T> {
    return await response.then((result) => result.data);
  }

  static toQueryString(filter?: FetcherFilterCriteria<never>): string {
    const searchParams = new URLSearchParams(filter as string[][]);

    return searchParams.toString();
  }

  public getAll(filter?: FetcherFilterCriteria<TModel>): Promise<TModel[]> {
    return Fetcher.extractData<TModel[]>(
      this.api.get(`${this.endpoint}?${Fetcher.toQueryString(filter)}`),
    );
  }

  public getOne(id: string): Promise<TModel> {
    return Fetcher.extractData<TModel>(this.api.get(`${this.endpoint}/${id}`));
  }

  public createOne(data: Omit<TModel, "id" | "createdAt">): Promise<TModel> {
    return Fetcher.extractData<TModel>(this.api.post(this.endpoint, data));
  }

  public deleteOne(id: string): Promise<TModel> {
    return Fetcher.extractData<TModel>(
      this.api.delete(`${this.endpoint}/${id}`),
    );
  }
}
