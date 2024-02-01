import { FC, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../../lib/types";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  return (
    <ul className="grid divide-y divide-border overflow-y-auto max-h-[55dvh]">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
          isEditing={todo.id === editingTodoId}
          setIsEditing={() =>
            setEditingTodoId((prev) => (prev === todo.id ? null : todo.id))
          }
        />
      ))}
    </ul>
  );
};

export default TodoList;