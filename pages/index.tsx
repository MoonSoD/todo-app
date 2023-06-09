import { FC } from "react";
import { TodoList, useTodoListQuery } from "@services/todo-list";
import { Grid, Layout, TodoListCard, TodoListCardSkeleton } from "@components";
import { todoListFetcher } from "@services/todo-list/todo-list";
import { InferGetStaticPropsType } from "next";
import { FetcherFilterCriteria } from "@services/abstract";

type Props = InferGetStaticPropsType<typeof getServerSideProps>;

const todoListsFilter: FetcherFilterCriteria<TodoList> = [
  ["sortby", "id"],
  ["order", "desc"],
];

const Index: FC<Props> = ({ todoLists }) => {
  const todoListItems = useTodoListQuery().all({
    initialData: todoLists,
    variables: {
      filter: todoListsFilter,
    },
  });

  return (
    <Layout title="Todo lists">
      <Grid>
        <TodoListCardSkeleton />
        {todoListItems.data?.map((list) => (
          <TodoListCard key={list.id} {...list} />
        ))}
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  const todoLists = await todoListFetcher.getAll(todoListsFilter);

  return {
    props: {
      todoLists,
    },
  };
}

export default Index;
