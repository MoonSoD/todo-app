import { createMutation, MutationHook } from "react-query-kit";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TodoItem } from "@services/todo-item/index";
import { todoListFetcher } from "@services/todo-list/todo-list";
import { pick } from "next/dist/lib/pick";

type UseTodoItemMutation = () => {
  create: MutationHook<TodoItem, unknown, Omit<TodoItem, "id" | "createdAt">>;
  update: MutationHook<TodoItem, unknown, Partial<TodoItem> & RelationQuery>;
  remove: MutationHook<TodoItem, unknown, RelationQuery>;
};

export interface RelationQuery {
  id: string;
  relationId: string;
}

/**
 * Destructuring breaks rules of react hooks, functions are only callable
 */
export const useTodoItemMutation: UseTodoItemMutation = () => {
  const queryClient = useQueryClient();

  const create = createMutation({
    mutationFn: (variables: TodoItem) =>
      todoListFetcher.createOneWith(
        variables.todo_listId,
        "todo_item",
        pick(variables, ["title", "description", "deadline", "completed"]),
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todo_list.todo_items"]);
      toast.success(`${data.title} has been successfully created!`);
    },
  });

  const update = createMutation({
    mutationFn: (variables?: TodoItem & RelationQuery) =>
      todoListFetcher.updateOneWith(
        variables.id,
        "todo_item",
        variables.relationId,
        pick(variables, ["title", "description", "deadline", "completed"]),
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todo_list.todo_items"]);
      toast.success(`${data.title} has been successfully updated.`);
    },
  });

  const remove = createMutation({
    mutationFn: (variables: RelationQuery) =>
      todoListFetcher.deleteOneWith(
        variables.id,
        "todo_item",
        variables.relationId,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todo_list.todo_items"]);
      toast.success(`${data.title} has been successfully deleted.`);
    },
  });

  return { create, update, remove };
};
