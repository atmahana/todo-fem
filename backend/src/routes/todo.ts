import express from 'express';
import { createTodo, deleteTodo, getAllActiveTodos, getAllCompletedTodos, getAllTodos, updateCompleteTodo } from '../controllers/todo';

export default (router: express.Router) => {
  router.get('/todos', getAllTodos);
  router.get('/todos/active', getAllActiveTodos);
  router.get('/todos/completed', getAllCompletedTodos);
  router.post('/todo', createTodo);
  router.patch('/todo/:id', updateCompleteTodo);
  router.delete('/todo/:id', deleteTodo);
}