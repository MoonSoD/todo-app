import { createMutation, MutationHook } from "react-query-kit";
import { todoListFetcher } from "./todo-list";
import { TodoList } from "./index";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type UseTodoMutation = () => {
  create: MutationHook<TodoList, unknown, Omit<TodoList, "id" | "createdAt">>;
  remove: MutationHook<TodoList, unknown, Pick<TodoList, "id">>;
};

/**
 * Destructuring breaks rules of react hooks, functions are only callable
 */
export const useTodoListMutation: UseTodoMutation = () => {
  const queryClient = useQueryClient();

  const create = createMutation({
    mutationFn: (variables: TodoList) => todoListFetcher.createOne(variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todo_lists"]);
      toast.success(`${data.name} has been successfully created!`);
    },
  });

  const remove = createMutation({
    mutationFn: (variables: Pick<TodoList, "id">) =>
      todoListFetcher.deleteOne(variables.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todo_lists"]);
      toast.success(`${data.name} has been successfully deleted.`);
    },
  });

  return { create, remove };
};
