import { FC, useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import Loader from "../Loader";
import ProgressBar from "./ProgressBar";
import TodoList from "../Todos/TodoList";
import {
  useDeleteCompleted,
  useGetActiveCountQuery,
  useGetTodosQuery,
} from "../../hooks/useClerkQuery";
import EmptyContent from "../EmptyContent";

interface ContentProps {
  type: "all" | "active" | "completed";
}

const Content: FC<ContentProps> = ({ type }) => {
  const { data: todos, isError, isLoading } = useGetTodosQuery(type),
    { data: count } = useGetActiveCountQuery(),
    { mutate: mutateDeleteCompleted, isPending } = useDeleteCompleted(),
    isFetching = useIsFetching(),
    [currentPath, setCurrentPath] = useState(""),
    activeCount = count ? count : 0;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const clickHandler = () => {
    if (count !== todos?.length) {
      mutateDeleteCompleted();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center text-input text-sm md:text-base">
        <p>Something went wrong. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {todos?.length === 0 ? (
        <EmptyContent />
      ) : (
        <div className="bg-foreground overflow-hidden shadow-sm rounded-md relative">
          {isFetching || isPending ? <ProgressBar /> : null}
          <TodoList todos={todos!} />
          <div className="flex justify-between items-center px-5 py-4 text-xs md:text-sm text-input-muted border-t border-border">
            {currentPath !== "/completed" ? (
              <span>{activeCount as number} items left</span>
            ) : null}
            {currentPath !== "/active" ? (
              <button
                onClick={clickHandler}
                className="hover:text-input ml-auto focus:ring-2 focus:ring-primary focus-visible:outline outline-2 outline-primary rounded"
              >
                Clear Completed
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
