import { Request, Response } from 'express';
import { WithAuthProp } from '@clerk/clerk-sdk-node';

import { TodoModel, countActiveTodos, createNewTodo, deleteCompletedTodos, deleteTodoById, getActiveTodos, getCompletedTodos, getTodoById, getTodos, updateTodoById } from "../models/Todo";
import { clerkClient } from "../lib/clerkClient";

const unauthenticated = (res: Response) => {
  res.status(401).json({ error: "Session expired or invalid" });
}

const createTodo = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { text } = req.body;

    const user = await clerkClient.users.getUser(req.auth.userId);

    if (!text) {
      return res.status(400).json({ error: 'Empty text input received', request: req.body });
    }

    const newTodo = createNewTodo({
      text,
      isCompleted: false,
      userId: user.id
    });

    return res.status(200).json(newTodo).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

const getAllTodos = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerkClient.users.getUser(req.auth.userId);

    if (!user || typeof user.id !== 'string' || user.id !== req.auth.userId) {
      return res.status(403).json({ error: "Invalid user or user ID" });
    }

    const todos = await getTodos(user.id);

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllActiveTodos = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerkClient.users.getUser(req.auth.userId);

    if (!user || typeof user.id !== 'string' || user.id !== req.auth.userId) {
      return res.status(403).json({ error: "Invalid user or user ID" });
    }

    const todos = await getActiveTodos(user.id);

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getActiveCount = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerkClient.users.getUser(req.auth.userId);

    const todosCount = await countActiveTodos(user.id);

    return res.status(200).json(todosCount);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCompletedTodos = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerkClient.users.getUser(req.auth.userId);

    if (!user || typeof user.id !== 'string' || user.id !== req.auth.userId) {
      return res.status(403).json({ error: "Invalid user or user ID" });
    }

    const todos = await getCompletedTodos(user.id);

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { id } = req.query;

    const deletedTodo = await deleteTodoById(id as string);

    return res.json(deletedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const updateTodoStatus = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { id } = req.query;

    if (!id) {
      return res.sendStatus(400).json({ error: "Id not found" });
    }

    const todo = await getTodoById(id as string);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res.status(200).json(todo).end();

  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

const updateTodo = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { id } = req.query;
    const { text } = req.body;

    if (!id) {
      return res.sendStatus(400).json({ error: "Id not found" });
    }

    const todo = await getTodoById(id as string);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    let updatedTodo;

    if (text) {
      updatedTodo = await updateTodoById(id as string, { text });
    } else {
      todo.isCompleted = !todo.isCompleted;
      updatedTodo = todo.save();
    }

    return res.status(200).json(updatedTodo).end();

  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

const deleteAllCompletedTodos = async (req: WithAuthProp<Request>, res: Response) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerkClient.users.getUser(req.auth.userId);

    const deletedTodos = await deleteCompletedTodos(user.id);

    return res.json(deletedTodos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getAllTodos, getAllActiveTodos, getAllCompletedTodos, createTodo, deleteTodo, updateTodoStatus, updateTodo, deleteAllCompletedTodos, getActiveCount }