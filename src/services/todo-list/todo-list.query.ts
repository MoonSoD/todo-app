import { createQuery, QueryHook } from "react-query-kit";
import { todoListFetcher } from "./todo-list";
import { TodoList } from "./index";
import { TodoItem } from "@services/todo-item";
import { FilterVars, FindFilterVars, FindVars } from "@services";
import { useQueryClient } from "@tanstack/react-query";

type UseTodoListQuery = () => {
  all: QueryHook<TodoList[], FilterVars<TodoList>, unknown>;
  one: QueryHook<TodoList, FindVars, unknown>;
  oneAllItems: QueryHook<TodoItem[], FindFilterVars<TodoItem>, unknown>;
};

export const useTodoListQuery: UseTodoListQuery = () => {
  const queryClient = useQueryClient();

  const all = createQuery<TodoList[], FilterVars<TodoList>>({
    primaryKey: "todo_lists",
    queryFn: ({ queryKey: [, vars] }) => todoListFetcher.getAll(vars?.filter),
  });

  const one = createQuery<TodoList, FindVars>({
    primaryKey: "todo_list",
    queryFn: ({ queryKey: [, vars] }) => todoListFetcher.getOne(vars.id),
  });

  const oneAllItems = createQuery<TodoItem[], FindFilterVars<TodoItem>>({
    primaryKey: "todo_list.todo_items",
    queryFn: ({ queryKey: [, vars] }) =>
      todoListFetcher.getOneWith(vars.id, "todo_item", vars.filter),
  });

  return {
    all,
    one,
    oneAllItems,
  };
};
