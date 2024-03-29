import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: Date,
  isCompleted: Boolean
});

todoSchema.index({ userId: 1 });

export const TodoModel = mongoose.model("Todo", todoSchema);

export const createNewTodo = (values: Record<string, any>) => new TodoModel(values).save().then((todo) => todo.toObject());
export const getTodos = (userId: string) => TodoModel.find({ userId }, 'text isCompleted').lean();
export const getActiveTodos = (userId: string) => TodoModel.find({ userId, isCompleted: false }).lean();
export const getCompletedTodos = (userId: string) => TodoModel.find({ userId, isCompleted: true }).lean();
export const getTodoById = (id: string) => TodoModel.findById(id);
export const countActiveTodos = (userId: string) => TodoModel.countDocuments({ userId, isCompleted: false }).lean();
export const updateTodoById = (id: string, values: Record<string, any>) => TodoModel.findByIdAndUpdate(id, values);
export const deleteTodoById = (id: string) => TodoModel.findOneAndDelete({ _id: id });
export const deleteCompletedTodos = (userId: string) => TodoModel.deleteMany({ userId, isCompleted: true });

