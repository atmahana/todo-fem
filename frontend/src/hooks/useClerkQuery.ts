import axios from "axios";
import { queryClient } from "../lib/queryClient";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Todo } from "../lib/types";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export const useGetTodosQuery = (type: 'all' | 'active' | 'completed') => {
  const { getToken } = useAuth();

  return useQuery<Todo[]>({
    queryKey: ["todos", { type }],
    queryFn: async () => {
      try {
        let url;

        if (type !== 'all') {
          url = `${BACKEND_URI}/api/v1/todo/${type}`;
        } else {
          url = `${BACKEND_URI}/api/v1/todo`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        });

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

const useCreateTodo = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["newTodo"],
    mutationFn: async (newTodo: string) => {
      const url = `${BACKEND_URI}/api/v1/todo`;
      const data = {
        text: newTodo,
      };

      return axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })
}

const useUpdateTodoStatus = (id: string) => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["todo", id, { action: "update" }],
    mutationFn: async (id: string) => {
      const url = `${BACKEND_URI}/api/v1/todo?id=${id}`;

      return await axios.patch(url, null, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })
}

const useUpdateTodoText = (id: string) => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["todo", id, { action: "update" }],
    mutationFn: async (updatedTodo: string) => {
      const url = `${BACKEND_URI}/api/v1/todo?id=${id}`;
      const data = {
        text: updatedTodo
      }

      return await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })
}

const useDeleteTodo = (id: string) => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["todo", id, { action: "delete" }],
    mutationFn: async (id: string) => {
      const url = `${BACKEND_URI}/api/v1/todo?id=${id}`;

      return await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })
}

const useDeleteCompleted = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["todos", { action: "delete", isCompleted: true }],
    mutationFn: async () => {
      const url = `${BACKEND_URI}/api/v1/todo/completed`

      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })
}

export { useCreateTodo, useUpdateTodoStatus, useUpdateTodoText, useDeleteTodo, useDeleteCompleted };