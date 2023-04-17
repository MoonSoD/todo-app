import { FC } from "react";
import { TodoList, useTodoListMutation } from "@services/todo-list";
import Link from "next/link";
import dayjs from "dayjs";

export const TodoListCard: FC<TodoList> = ({ id, name, createdAt }) => {
  const deleteTodoList = useTodoListMutation().remove();

  return (
    <article className="bg-card h-32 p-4 rounded">
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <Link href={`/list/${id}`}>
            <h3 className="cursor-pointer text-black text-xl truncate">
              {name}
            </h3>
          </Link>
          <button
            onClick={() => deleteTodoList.mutate({ id })}
            className="text-red-600"
          >
            delete
          </button>
        </div>
        <p className="text-gray-400">
          {dayjs(createdAt).format("DD MMMM YYYY hh:mm")}
        </p>
      </div>
    </article>
  );
};
