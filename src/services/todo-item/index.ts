export interface TodoItem {
  readonly id: string;
  readonly createdAt: string;
  readonly todo_listId: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}
