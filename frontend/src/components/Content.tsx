import { FC, useEffect, useState } from "react";
import TodoList from "./Todos/TodoList";
import { useSanitizeData } from "../hooks/useSanitizeData";
import { useDeleteCompleted, useGetTodosQuery } from "../hooks/useClerkQuery";
import Loader from "./Loader";

interface ContentProps {
  type: "all" | "active" | "completed";
}

const Content: FC<ContentProps> = ({ type }) => {
  const { data: activeTodos } = useGetTodosQuery("active"),
    { data: todos, isError, isLoading } = useGetTodosQuery(type),
    { sanitizedData: sanitizedTodos } = useSanitizeData(todos),
    deleteCompletedMutation = useDeleteCompleted(),
    [currentPath, setCurrentPath] = useState(""),
    activeCount = activeTodos ? activeTodos.length : 0;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const clickHandler = () => {
    deleteCompletedMutation.mutate();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {isError ? <p>Something went wrong</p> : null}
      {sanitizedTodos?.length === 0 ? (
        <div className="bg-foreground grid divide-y-2 rounded-md p-5 text-sm text-muted shadow-sm">
          No task(s) available
        </div>
      ) : (
        <div className="bg-foreground shadow-sm rounded-md">
          <TodoList todos={sanitizedTodos!} />
          <div className="flex justify-between items-center px-5 py-4 text-xs md:text-sm text-input-muted border-t border-border">
            {currentPath !== "/completed" ? (
              <span>{activeCount} items left</span>
            ) : null}
            {currentPath !== "/active" ? (
              <button onClick={clickHandler} className="hover:text-input ml-auto">
                Clear Completed
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export { Content };
