import axios from "axios";
import { queryClient } from "./queryClient";

const getTodosQuery = (type: 'all' | 'active' | 'completed') => ({
  queryKey: ["todos", { type }],
  queryFn: async () => {
    let url;
    if (type !== 'all') {
      url = `http://localhost:5000/todos/${type}`;
    } else {
      url = "http://localhost:5000/todos";
    }

    const res = await axios.get(url);
    return res.data;
  },
});

const updateTodo = (id: string) => ({
  mutationKey: ["todo", id, { action: "update" }],
  mutationFn: async (id: string) => {
    const url = `http://localhost:5000/todo?id=${id}`;

    return await axios.patch(url);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

const deleteTodo = (id: string) => ({
  mutationKey: ["todo", id, { action: "delete" }],
  mutationFn: async (id: string) => {
    const url = `http://localhost:5000/todo/delete?id=${id}`;

    return await axios.delete(url);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

const deleteCompleted = () => ({
  mutationKey: ["todos", { action: "delete", isCompleted: true }],
  mutationFn: async () => {
    const res = await axios.delete("http://localhost:5000/todos/delete");
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
})

export { getTodosQuery, updateTodo, deleteTodo, deleteCompleted };
