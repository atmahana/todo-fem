import { FunctionComponent, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { todo } from "../../lib/types";

interface TodoListProps {
  todos: todo[];
  activeCount: number;
  clearCompletedHandler: () => void;
}

const TodoList: FunctionComponent<TodoListProps> = ({
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
    <ul className="bg-foreground grid divide-y divide-border rounded-md shadow-lg">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
        />
      ))}
      <li className="flex justify-between px-5 py-4 text-xs text-input-muted">
        {currentPath !== "/completed" ? (
          <span>{activeCount} items left</span>
        ) : null}
        {currentPath !== "/active" ? (
          <button onClick={clickHandler} className="ml-auto">Clear Completed</button>
        ) : null}
      </li>
    </ul>
  );
};

export default TodoList;
