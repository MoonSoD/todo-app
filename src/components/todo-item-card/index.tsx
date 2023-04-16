import { FC } from "react";
import { useTodoListMutation } from "@services/todo-list";
import { TodoItem as TodoItemProps } from "@services/todo-item";

export const TodoItemCard: FC<TodoItemProps> = ({
  id,
  todo_listId,
  createdAt,
  completed,
  deadline,
  title,
  description,
}) => {
  const deleteTodoList = useTodoListMutation().remove();

  return (
    <article className="bg-card h-32 p-4 rounded">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <h3 className="text-black text-xl">{title}</h3>
            <button onClick={null} className="text-red-600">
              delete
            </button>
          </div>
          <p className="text-red-600">
            <span className="font-bold">till </span>
            {new Date(deadline).toLocaleString()}
          </p>
        </div>

        <p className="text-gray-400">{description}</p>
      </div>
    </article>
  );
};
