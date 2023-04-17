import { ChangeEvent, FC, useState } from "react";
import {
  TodoItem as TodoItemProps,
  useTodoItemMutation,
} from "@services/todo-item";
import classNames from "classnames";
import dayjs from "dayjs";

export const TodoItemCard: FC<TodoItemProps> = ({
  id,
  todo_listId,
  createdAt,
  completed,
  deadline,
  title,
  description,
}) => {
  const deleteTodoItem = useTodoItemMutation().remove();
  const updateTodoItem = useTodoItemMutation().update();

  const [isCompleted, setCompleted] = useState<boolean>(completed);

  const completeTodoItemMutation = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);

    updateTodoItem.mutate({
      relationId: id,
      id: todo_listId,
      completed: event.target.checked,
    });

    if (updateTodoItem.isError) {
      setCompleted(false);
    }
  };

  return (
    <article className="bg-card h-44 p-4 rounded">
      <div className="h-full flex flex-col justify-between">
        <div>
          <input
            checked={isCompleted}
            onChange={(event) => completeTodoItemMutation(event)}
            className="h-10 w-10"
            type="checkbox"
            name="completed"
          />
          <div className="flex justify-between">
            <h3
              className={classNames("text-black text-xl truncate", {
                "line-through": isCompleted,
              })}
            >
              {title}
            </h3>
            <button
              onClick={() =>
                deleteTodoItem.mutate({ id: todo_listId, relationId: id })
              }
              className="text-red-600"
            >
              delete
            </button>
          </div>
          <p
            className={classNames("text-yellow-500", {
              "text-lightgreen": isCompleted,
              "text-red-600": !isCompleted && dayjs().isAfter(dayjs(deadline)),
            })}
          >
            <span className="font-bold">till </span>
            {dayjs(deadline).format("d MMMM YYYY hh:mm")}
          </p>
        </div>

        <p className="text-gray-400 truncate">{description}</p>
      </div>
    </article>
  );
};
