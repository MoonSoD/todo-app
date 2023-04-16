import React from "react";
import { useTodoListQuery } from "@services/todo-list";
import { Grid, TodoListCard, TodoListCardSkeleton } from "@components";
import { todoListFetcher } from "@services/todo-list/todo-list";

const Index: React.FC = ({ todoLists }) => {
  const todoLists = useTodoListQuery().all({
    initialData: todoLists,
    variables: {
      filter: [
        ["sortby", "id"],
        ["order", "desc"],
      ],
    },
  });

  return (
    <Grid>
      <TodoListCardSkeleton />
      {todoLists.data?.map((list) => (
        <TodoListCard key={list.id} {...list} />
      ))}
    </Grid>
  );
};

export async function getStaticProps() {
  const todoLists = await todoListFetcher.getAll();

  return {
    props: {
      todoLists,
    },
  };
}

export default Index;
