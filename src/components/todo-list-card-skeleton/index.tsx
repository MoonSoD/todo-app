import React, { FC } from "react";
import { useTodoListMutation } from "@services/todo-list";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required(),
});

export const TodoListCardSkeleton: FC = () => {
  const createTodoList = useTodoListMutation().create();

  const { register, formState, getValues, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const createTodoListMutation = () => {
    createTodoList.mutate({ name: getValues("name") });

    if (createTodoList.isSuccess) {
      reset({ name: "" });
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    if (!formState.isValid) {
      return;
    }

    createTodoListMutation();
  };

  return (
    <article className="bg-card h-32 p-4 rounded">
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <input
            {...register("name")}
            onKeyDown={(event) => handleEnter(event)}
            placeholder="Start typing list name..."
            className="outline-none bg-card text-black text-xl placeholder-gray-600"
          />

          <button
            onClick={() => createTodoListMutation()}
            disabled={!formState.isValid}
            className="text-lightgreen disabled:opacity-20 disabled:cursor-not-allowed"
          >
            create
          </button>
        </div>
      </div>
    </article>
  );
};
