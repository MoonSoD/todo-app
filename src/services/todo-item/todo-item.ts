import { Fetcher } from "@services";
import { TodoItem } from "@services/todo-item/index";

class TodoItemFetcher extends Fetcher<TodoItem> {}

export const todoItemFetcher = new TodoItemFetcher("todo_item");
