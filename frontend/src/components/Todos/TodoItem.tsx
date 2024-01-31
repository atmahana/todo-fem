import { FC } from "react";
import { Todo } from "../../lib/types";
import IconCross from "../../assets/icon-cross.svg";
import { useUpdateTodo, useDeleteTodo } from "../../hooks/useClerkQuery";
import style from "./Checkbox.module.css";

const TodoItem: FC<Todo> = ({ id, text, isCompleted }) => {
  const updateMutation = useUpdateTodo(id);
  const deleteMutation = useDeleteTodo(id);

  const changeHandler = (id: string) => {
    updateMutation.mutate(id);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <li className="grid grid-flow-col gap-3 px-5 md:px-6 py-4 md:py-[1.125rem] w-full">
      <label className={style.container + " cursor-pointer relative pl-10"} htmlFor={id}>
        <input
          defaultChecked={isCompleted}
          onChange={() => changeHandler(id)}
          type="checkbox"
          id={id}
        />
        <span className={style.checkmark + " border-2 border-border"} />
        <p
          className={`text-sm md:text-lg whitespace-pre-wrap w-full transition-all ${
            isCompleted ? "text-muted line-through" : "text-input"
          }`}
        >
          {text}
        </p>
      </label>
      <button className="ml-auto" onClick={() => deleteHandler(id)}>
        <img src={IconCross} className="w-4 md:w-5" />
      </button>
    </li>
  );
};

export default TodoItem;
