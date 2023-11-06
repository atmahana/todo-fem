import { FunctionComponent } from "react";

interface TodoFormProps {}

const TodoForm: FunctionComponent<TodoFormProps> = () => {
  return (
    <form>
      <input type="text" placeholder="Create a new todo..." className="input"/>
    </form>
  );
};

export default TodoForm;
