import express from 'express';
import { createTodo, deleteAllCompletedTodos, deleteTodo, getAllActiveTodos, getAllCompletedTodos, getAllTodos, updateTodoStatus, updateTodo, getActiveCount } from '../../controllers/todo';
import { clerkClient } from "../../lib/clerkClient";

export default (router: express.Router) => {
  router.post('/api/v1/todo', clerkClient.expressWithAuth(), createTodo);
  router.get('/api/v1/todo', clerkClient.expressWithAuth(), getAllTodos);
  router.patch('/api/v1/todo', clerkClient.expressWithAuth(), updateTodo);
  router.delete('/api/v1/todo', clerkClient.expressWithAuth(), deleteTodo);
  router.get('/api/v1/todo/active', clerkClient.expressWithAuth(), getAllActiveTodos);
  router.get('/api/v1/todo/active/count', clerkClient.expressWithAuth(), getActiveCount);
  router.get('/api/v1/todo/completed', clerkClient.expressWithAuth(), getAllCompletedTodos);
  router.delete('/api/v1/todo/completed', clerkClient.expressWithAuth(), deleteAllCompletedTodos);
}