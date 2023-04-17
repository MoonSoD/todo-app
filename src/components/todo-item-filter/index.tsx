import { FC } from "react";
import { useSearch } from "@hooks/use-search";

export const TodoItemFilter: FC = () => {
  const search = useSearch();

  return (
    <article className="bg-card flex justify-between items-center h-20 p-4 rounded">
      <input
        className="shadow-sm outline-none text-black rounded w-40 h-10 px-2"
        placeholder="Search..."
        type="text"
        {...search.register("title")}
      />
      <select
        className="shadow-sm rounded outline-none w-40 h-10 px-2"
        placeholder="Filter..."
        {...search.register("completed")}
      >
        <option value="">all</option>
        <option value="false">active</option>
        <option value="true">completed</option>
      </select>
    </article>
  );
};
