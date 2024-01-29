import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useCreateTodo } from "../../hooks/useClerkQuery";

const TodoForm: FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const addTodoMutation = useCreateTodo();
  const [enteredText, setEnteredText] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setTimeout(() => {
      setEnteredText(newValue);
    }, 0.5);
  }

  let submitHandler: (event: FormEvent) => Promise<void>;

  if (isSignedIn) {
    submitHandler = async (event: FormEvent) => {
      event.preventDefault();
      try {
        addTodoMutation.mutate(enteredText);
        setEnteredText("");
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    submitHandler = async (event: FormEvent) => {
      event.preventDefault();
      navigate("/sign-in");
    };
  }

  return (
    <form className="relative shadow-sm" onSubmit={submitHandler}>
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