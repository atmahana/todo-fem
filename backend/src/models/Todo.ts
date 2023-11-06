import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: Date,
  isCompleted: Boolean,
});

export const TodoModel = mongoose.model("Todo", todoSchema);

export const getTodos = () => TodoModel.find();
export const getActiveTodos = () => TodoModel.find({ isCompleted: false });
export const getCompletedTodos = () => TodoModel.find({ isCompleted: true });
export const getTodoById = (id: string) => TodoModel.findById(id);
export const createNewTodo = (values: Record<string, any>) => new TodoModel(values).save().then((todo) => todo.toObject());
export const updateTodoById = (id: string, values: Record<string, any>) => TodoModel.findByIdAndUpdate(id, values);
export const deleteTodoById = (id: string) => TodoModel.findOneAndDelete({ _id: id });  