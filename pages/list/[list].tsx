import React, { FC } from "react";
import { todoListFetcher } from "@services/todo-list/todo-list";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import {
  Grid,
  Layout,
  TodoItemCard,
  TodoItemCardSkeleton,
  TodoItemFilter,
} from "@components";
import { useTodoListQuery } from "@services/todo-list";
import { useSearch } from "@hooks/use-search";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TodoList: FC<Props> = ({ todos, listId, listName }) => {
  const search = useSearch();
  const todoItems = useTodoListQuery().oneAllItems({
    initialData: todos,
    variables: {
      id: listId,
      filter: [
        ["title", search.byTitle],
        ["completed", search.byCompletion],
      ],
    },
  });

  return (
    <Layout title={listName} hasBackButton>
      <Grid>
        <TodoItemCardSkeleton todo_listId={listId} />
        <TodoItemFilter />
        {todoItems.data?.map((todo) => (
          <TodoItemCard key={todo.id} {...todo} />
        ))}
      </Grid>
    </Layout>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const listId = params.list as string;

  const list = await todoListFetcher.getOne(listId);
  const todos = await todoListFetcher.getOneWith(listId, "todo_item");

  return {
    props: {
      todos,
      listId,
      listName: list.name,
    },
  };
}

export async function getStaticPaths() {
  const todoLists = await todoListFetcher.getAll();

  const paths = todoLists.map((list) => ({
    params: { list: list.id },
  }));

  return { paths, fallback: true };
}

export default TodoList;
