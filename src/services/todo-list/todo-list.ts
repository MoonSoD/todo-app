import { O2MRelationFetcher } from "@services";
import { TodoItem } from "@services/todo-item";
import { TodoList } from "@services/todo-list/index";

type O2MRelation = "todo_item";

class TodoListFetcher extends O2MRelationFetcher<
  TodoList,
  O2MRelation,
  TodoItem
> {}

export const todoListFetcher = new TodoListFetcher("todo_list");
