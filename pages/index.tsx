import { FC } from "react";
import { useTodoListQuery } from "@services/todo-list";
import { Grid, Layout, TodoListCard, TodoListCardSkeleton } from "@components";
import { todoListFetcher } from "@services/todo-list/todo-list";
import { InferGetStaticPropsType } from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: FC<Props> = ({ todoLists }) => {
  const todoListItems = useTodoListQuery().all({
    initialData: todoLists,
    variables: {
      filter: [
        ["sortby", "id"],
        ["order", "desc"],
      ],
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

export async function getStaticProps() {
  const todoLists = await todoListFetcher.getAll();

  return {
    props: {
      todoLists,
    },
  };
}

export default Index;
