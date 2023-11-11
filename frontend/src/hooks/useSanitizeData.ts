export const useSanitizeData = (todos: any) => {
  const sanitizedData = Array.isArray(todos)
    ? todos.map((todo) => ({
      id: todo._id,
      text: todo.text,
      isCompleted: todo.isCompleted,
    }))
    : [];

  return { sanitizedData };
}