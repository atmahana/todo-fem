import { FunctionComponent } from "react";
import { useMutation } from "@tanstack/react-query";
import { todo } from "../../lib/types";
import IconX from "../../assets/icon-cross.svg";
import { deleteTodo, updateTodo } from "../../lib/queries";

const TodoItem: FunctionComponent<todo> = ({ id, text, isCompleted }) => {
  const updateMutation = useMutation(updateTodo(id));
  const deleteMutation = useMutation(deleteTodo(id));

  const changeHandler = (id: string) => {
    updateMutation.mutate(id);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <li className="flex gap-5 md:gap-6 px-5 md:px-6 py-4 md:py-[1.125rem] w-full">
      <input
        defaultChecked={isCompleted}
        onChange={() => changeHandler(id)}
        type="checkbox"
        id={id}
        className="rounded-full border-muted-2 md:w-6 md:h-6 checked:bg-gradient-to-r checked:from-gradient-start checked:to-gradient-end bg-foreground"
      />
      <label
        htmlFor={id}
        className={`text-sm md:text-lg ${
          isCompleted ? "text-muted line-through" : "text-input"
        }`}
      >
        {text}
      </label>
      <button className="ml-auto" onClick={() => deleteHandler(id)}>
        <img src={IconX} className="w-3" />
      </button>
    </li>
  );
};

export default TodoItem;
