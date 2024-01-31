import { FC, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../../lib/types";

interface TodoListProps {
  todos: Todo[];
  activeCount: number;
  clearCompletedHandler: () => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  activeCount,
  clearCompletedHandler,
}) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const clickHandler = () => {
    clearCompletedHandler();
  };

  return (
    <ul className="bg-foreground grid divide-y divide-border rounded-md shadow-sm">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
        />
      ))}
      <li className="flex justify-between items-center px-5 py-4 text-xs md:text-sm text-input-muted">
        {currentPath !== "/completed" ? (
          <span>{activeCount} items left</span>
        ) : null}
        {currentPath !== "/active" ? (
          <button onClick={clickHandler} className="hover:text-input">
            Clear Completed
          </button>
        ) : null}
      </li>
    </ul>
  );
};

export default TodoList;
