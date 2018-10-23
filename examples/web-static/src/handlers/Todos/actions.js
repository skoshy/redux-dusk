export const insertTodo = (state, action) => {
  state.todos.push({
    id: state.todos.length + Math.random(),
    title: action.title,
  });
  return { ...state };
};

export const deleteTodo = (state, action) => {
  return {
    ...state,
    todos: state.todos.filter((todo) => {
      // filter out the todo with the given todoId
      return todo.id !== action.todoId;
    }),
  };
};

export const resetTitle = (state) => {
  return {
    ...state,
    numberOfTitleResets: state.numberOfTitleResets + 1,
  };
};

export default null;
