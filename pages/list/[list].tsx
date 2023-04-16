import React from "react";
import { todoListFetcher } from "@services/todo-list/todo-list";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Grid, TodoItemCard } from "@components";
import { useTodoListQuery } from "@services/todo-list";
import { useRouter } from "next/router";
import { list } from "postcss";

const TodoList = ({
  todos,
  listId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const todoItems = useTodoListQuery().oneAllItems({
    initialData: todos,
    variables: { id: listId as string },
  });

  return (
    <Grid>
      {todoItems.data?.map((todo) => (
        <TodoItemCard key={todo.id} {...todo} />
      ))}
    </Grid>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const listId = params.list;

  const todos = await todoListFetcher.getOneWith(listId as string, "todo_item");

  return {
    props: {
      todos,
      listId,
    },
  };
}

export async function getStaticPaths() {
  const todoLists = await todoListFetcher.getAll();

  const paths = todoLists.map((list) => ({
    params: { list: list.id },
  }));

  return { paths, fallback: false };
}

export default TodoList;
