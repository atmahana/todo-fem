import { ChangeEvent, FC, useState } from "react";

import style from "./Checkbox.module.css";
import IconCross from "../../assets/icon-cross.svg";
import IconEdit from "../../assets/icon-edit.svg";
import {
  useDeleteTodo,
  useUpdateTodoStatus,
  useUpdateTodoText,
} from "../../hooks/useClerkQuery";

interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  text,
  isCompleted,
  isEditing,
  setIsEditing,
}) => {
  const updateStatusMutation = useUpdateTodoStatus(id);
  const deleteMutation = useDeleteTodo(id);
  const updateTextMutation = useUpdateTodoText(id);
  const [updatedText, setUpdatedText] = useState(text);
  const [isError, setIsError] = useState(false);

  const updateStatusHandler = () => {
    updateStatusMutation.mutate(id);
  };

  const deleteHandler = () => {
    deleteMutation.mutate(id);
  };

  const clickEditHandler = () => {
    setIsEditing(!isEditing);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(e.target.value);
    setIsError(false);
  };

  const updateTodoText = () => {
    if (updatedText === "" || updatedText === "\n") {
      setIsError(true);
    } else {
      updateTextMutation.mutate(updatedText);
      setIsError(false);
      setIsEditing(false);
    }
  };

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") updateTodoText();
  };

  return (
    <li className="grid grid-flow-col grid-cols-3 md:grid-cols-7 gap-3 w-full">
      {isEditing ? (
        <input
        type="text"
          value={updatedText}
          className={`text-sm md:text-lg whitespace-pre-wrap col-span-6 text-input bg-transparent ${
            isError === true ? "focus:border-red-500 focus:ring-0 border-red-500" : "" 
          }`}
          onChange={changeHandler}
          onBlur={updateTodoText}
          onKeyDown={enterKeyHandler}
          autoFocus
        />
      ) : (
        <label
          className={
            style.container +
            " cursor-pointer relative col-span-6 pl-14 md:pl-16 md py-[1.125rem]"
          }
          htmlFor={id}
        >
          <input
            checked={isCompleted}
            onChange={updateStatusHandler}
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
      )}
      <div className="flex gap-3 items-start py-[1.25rem] pr-5 md:pr-6">
        <button onClick={clickEditHandler}>
          <img src={IconEdit} className="w-4 md:w-5" />
        </button>
        <button className="ml-auto" onClick={deleteHandler}>
          <img src={IconCross} className="w-4 md:w-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
