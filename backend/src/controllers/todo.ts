import { createNewTodo, deleteCompletedTodos, deleteTodoById, getActiveTodos, getCompletedTodos, getTodoById, getTodos } from '../models/Todo';
import { Request, Response } from 'express';

const createTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.sendStatus(400);
    }

    const todo = await createNewTodo({
      text,
      isCompleted: false,
    });

    return res.status(200).json(todo).end();
  } catch (error) {
    return res.sendStatus(500).json({ error: "Internal server error" });
  }
}

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllActiveTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getActiveTodos();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCompletedTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getCompletedTodos();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const deletedTodo = await deleteTodoById(id as string);

    return res.json(deletedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const updateCompleteTodo = async (req: Request, res: Response) => {
  try {
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
    return res.status(500).json({ error: "Internal server error" });
  }
}

const deleteAllCompletedTodos = async (req: Request, res: Response) => {
  try {
    const deletedTodos = await deleteCompletedTodos();

    return res.json(deletedTodos);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getAllTodos, getAllActiveTodos, getAllCompletedTodos, createTodo, deleteTodo, updateCompleteTodo, deleteAllCompletedTodos }