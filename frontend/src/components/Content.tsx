import { FunctionComponent, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteCompleted, getTodosQuery } from "../lib/queries";
import TodoForm from "./Todos/TodoForm";
import TodoList from "./Todos/TodoList";
import { useSanitizeData } from "../hooks/useSanitizeData";

interface ContentProps {
  type: "all" | "active" | "completed";
}

const Content: FunctionComponent<ContentProps> = ({ type }) => {
  const { data: activeTodos } = useQuery(getTodosQuery("active"));

  console.log(activeTodos);

  const { data: todos, isError, isPending } = useQuery(getTodosQuery(type));
  const deleteCompletedMutation = useMutation(deleteCompleted());
  const { sanitizedData: sanitizedTodos } = useSanitizeData(todos);

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-4 md:gap-6">
      <TodoForm />
      {isError ? <p>Something went wrong</p> : null}
      {todos.length > 0 ? (
        <TodoList
          todos={sanitizedTodos}
          activeCount={activeTodos.length}
          clearCompletedHandler={deleteCompletedMutation.mutate}
        />
      ) : (
        <div className="bg-foreground grid divide-y-2 rounded-md p-5 text-sm text-muted">
          No task(s) available
        </div>
      )}
    </div>
  );
};

export { Content };
