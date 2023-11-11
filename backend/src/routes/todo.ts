import express from 'express';
import { createTodo, deleteAllCompletedTodos, deleteTodo, getAllActiveTodos, getAllCompletedTodos, getAllTodos, updateCompleteTodo } from '../controllers/todo';

export default (router: express.Router) => {
  router.get('/todos', getAllTodos);
  router.get('/todos/active', getAllActiveTodos);
  router.get('/todos/completed', getAllCompletedTodos);
  router.post('/todo', createTodo);
  router.patch('/todo', updateCompleteTodo);
  router.delete('/todo/delete', deleteTodo);
  router.delete('/todos/delete', deleteAllCompletedTodos);
}