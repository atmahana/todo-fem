import { FC } from "react";
import TodoForm from "./Todos/TodoForm";
import TodoList from "./Todos/TodoList";
import { useSanitizeData } from "../hooks/useSanitizeData";
import { useDeleteCompleted, useGetTodosQuery } from "../hooks/useClerkQuery";

interface ContentProps {
  type: "all" | "active" | "completed";
}

const Content: FC<ContentProps> = ({ type }) => {
  const { data: activeTodos, isLoading: activeIsLoading } = useGetTodosQuery("active");
  const { data: todos, isError, isLoading } = useGetTodosQuery(type);
  const { sanitizedData: sanitizedTodos } = useSanitizeData(todos);
  const deleteCompletedMutation = useDeleteCompleted();

  if (isLoading && activeIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <TodoForm />
      {isError ? <p>Something went wrong</p> : null}
      {sanitizedTodos!.length === 0 ? (
        <div className="bg-foreground grid divide-y-2 rounded-md p-5 text-sm text-muted shadow-sm">
          No task(s) available
        </div>
      ) : (
        <TodoList
          todos={sanitizedTodos!}
          activeCount={activeTodos ? activeTodos.length : 0}
          clearCompletedHandler={deleteCompletedMutation.mutate}
        />
      )}
    </div>
  );
};

export { Content };
