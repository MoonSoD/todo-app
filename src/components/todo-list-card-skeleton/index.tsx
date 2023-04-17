import { FC, KeyboardEvent, useEffect } from "react";
import { useTodoListMutation } from "@services/todo-list";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  name: string;
}

const schema = yup.object({
  name: yup.string().required(),
});

export const TodoListCardSkeleton: FC = () => {
  const createTodoList = useTodoListMutation().create();

  const { register, formState, reset, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const createTodoListMutation: SubmitHandler<FormValues> = (data) => {
    if (!formState.isValid) {
      return;
    }

    createTodoList.mutate({ ...data });
  };

  useEffect(() => reset(), [createTodoList.isSuccess]);

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    handleSubmit(createTodoListMutation)();
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
            onClick={() => handleSubmit(createTodoListMutation)()}
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
