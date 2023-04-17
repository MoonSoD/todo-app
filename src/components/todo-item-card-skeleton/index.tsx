import { FC, useEffect } from "react";
import { useTodoItemMutation } from "@services/todo-item";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { ControlledDatePicker } from "@components/controlled-date-picker";

interface Props {
  todo_listId: string;
}

interface FormValues {
  title: string;
  description: string;
  deadline: string;
}

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  deadline: yup.date().min(new Date(Date.now())).required(),
});

export const TodoItemCardSkeleton: FC<Props> = ({ todo_listId }) => {
  const createTodoItem = useTodoItemMutation().create();

  const { register, formState, reset, control, handleSubmit } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        title: "",
        description: "",
        deadline: "",
      },
    });

  const createTodoItemMutation: SubmitHandler<FormValues> = (data) => {
    if (!formState.isValid) {
      return;
    }

    createTodoItem.mutate({
      todo_listId,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      completed: false,
    });
  };

  useEffect(() => reset(), [createTodoItem.isSuccess]);

  return (
    <article className="bg-card h-44 p-4 rounded">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <input
              {...register("title")}
              placeholder="Start typing title..."
              type="text"
              className="text-black outline-none bg-card text-xl"
            />
            <button
              disabled={!formState.isValid}
              onClick={() => handleSubmit(createTodoItemMutation)()}
              className="text-lightgreen disabled:opacity-20 disabled:cursor-not-allowed"
            >
              create
            </button>
          </div>
          <div className="flex gap-1 w-max">
            <ControlledDatePicker control={control} name="deadline" />
          </div>
        </div>

        <textarea
          {...register("description")}
          placeholder="Start typing description.."
          className="text-gray-400 bg-card outline-none"
        />
      </div>
    </article>
  );
};
