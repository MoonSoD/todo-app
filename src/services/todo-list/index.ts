export interface TodoList {
  readonly id: string;
  name: string;
  readonly createdAt: string;
}

export { useTodoListQuery } from "./todo-list.query";
export { useTodoListMutation } from "./todo-list.mutation";
