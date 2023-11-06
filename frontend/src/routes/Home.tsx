import { useMutation } from "@tanstack/react-query";
import { FunctionComponent } from "react";
import { useLoaderData } from "react-router-dom";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const tasks = useLoaderData();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch('http://localhost:5000/todo', {
        method: "PATCH",
      })
    },
  });

  return (
    <div>
      {(tasks as []).map((task) => (
        <div key={task._id}>
          <p>{task.text}</p>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

export function loader() {
  return fetch("http://localhost:5000/todos");
}

export function action(){

}
