import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { queryClient } from "../../lib/queryClient";

interface TodoFormProps {}

const TodoForm: FunctionComponent<TodoFormProps> = () => {
  const [enteredText, setEnteredText] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setTimeout(() => {
      setEnteredText(newValue);
    }, 0.5);
  }

  const addTodoMutation = useMutation({
    mutationKey: ["newTodo"],
    mutationFn: (newTodo: string) => {
      const url = "http://localhost:5000/todo";
      const data = {
        text: newTodo,
      };

      return axios.post(url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      addTodoMutation.mutate(enteredText);
      setEnteredText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="relative shadow-lg" onSubmit={submitHandler}>
      <div className="border rounded-full w-5 aspect-square absolute top-1/2 -translate-y-1/2 left-5" />
      <input
        disabled={addTodoMutation.isPending}
        onChange={changeHandler}
        value={enteredText}
        type="text"
        placeholder="Create a new todo..."
        className="px-[3.25rem] md:px-[4.5rem] py-3 md:py-5 w-full rounded-md placeholder:text-xs md:placeholder:text-lg bg-foreground border-none placeholder:text-input-muted text-input"
      />
    </form>
  );
};

export default TodoForm;
